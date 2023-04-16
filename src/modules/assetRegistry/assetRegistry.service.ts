import { AppDataSource } from "../../db/db.config";
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