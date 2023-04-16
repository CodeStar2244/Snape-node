import { AppDataSource } from "../../db/db.config";
import AgentSettings from "../../entities/agentSettings";
import Assets from "../../entities/assets";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { AssetCreateModel, AssetUpdateModel } from "./assetRegistry.model";
export class AssetRegistryService {
    public createAsset = async (body:AssetCreateModel,userDetails) => {
        try {
           const assetRepo = AppDataSource.getRepository(Assets);
           const asset = assetRepo.create({
            nickName:body.nickName,
            deviceAmount:body.deviceAmount,
            deviceID:body.deviceID,
            type:body.type,
            agentId:userDetails.id
           })
           assetRepo.save(asset);
           return ResponseBuilder.data(asset)
        }  catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }
    }
    public getAssets = async (userDetails,params) => {
        try {
           const assetRepo = AppDataSource.getRepository(Assets);
           const assetsquery =  assetRepo.createQueryBuilder("assets")
           .where(`"assets"."agentId" = :agentId`,{agentId:userDetails.id})
           if(params.status){
            assetsquery.andWhere("assets.status =:status",{status:params.status})
           }
           const assets = await assetsquery.getMany();
           return ResponseBuilder.data(assets)
        }  catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }
    }
    public assetDashboard = async (userDetails) => {
        try {
           const assetRepo = AppDataSource.getRepository(Assets);
           const agentSettingRepo = AppDataSource.getRepository(AgentSettings);
           const assetGroupByStatusQuery =  assetRepo.createQueryBuilder("assets")
           .select(`count("assets"."id")`,"devices")
           .addSelect(`assets.status`,"status")
           .where(`"assets"."agentId" = :agentId`,{agentId:userDetails.id})
           .addGroupBy("assets.status");
           const assetGroupByTypeQuery =  assetRepo.createQueryBuilder("assets")
           .select(`count("assets"."id")`,"devices")
           .addSelect(`assets.type`,"type")
           .where(`"assets"."agentId" = :agentId`,{agentId:userDetails.id})
           .addGroupBy("assets.type");
           const getAssetAmountsPromise = agentSettingRepo.findOne({
            where:{
                agentId:{
                    id:userDetails.id
                }
            }
           })
           const [ assetGroupByStatus,assetGroupByType,getAssetAmounts] = await Promise.all([assetGroupByStatusQuery.getRawMany(),assetGroupByTypeQuery.getRawMany(),getAssetAmountsPromise]);
           return ResponseBuilder.data({
            summary:assetGroupByStatus,
            categoryData:assetGroupByType,
            totalAssetAmount:getAssetAmounts.assets
           })
        }  catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }
    }
    public updateAsset = async (userDetails,params,body) => {
        try {
           const assetRepo = AppDataSource.getRepository(Assets);
           const assetsquery =  assetRepo.createQueryBuilder("assets")
           .where(`"assets"."agentId" = :agentId`,{agentId:userDetails.id})
           .andWhere(`"assets"."id" = :id`,{id:params.id})
           const asset = await assetsquery.getOne();
           if(!asset){
            return ResponseBuilder.badRequest("Asset Not found",404)
           }

          const {nickName,deviceAmount,deviceID,status,type} = new AssetUpdateModel(body);
           const updateObject = {
         nickName,deviceAmount,deviceID,status,type
        }
        await assetRepo.save({ ...asset, ...updateObject,  });
        const updatedAsset = await assetsquery.getOne();
           return ResponseBuilder.data(updatedAsset)
        }  catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }
    }
    
   

}