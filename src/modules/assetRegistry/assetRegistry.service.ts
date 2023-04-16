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
           const assetsCount =  await assetRepo.createQueryBuilder("assets")
           .select(`count("assets"."id")`,"devices")
           .where(`"assets"."agentId" = :agentId`,{agentId:userDetails.id}).getRawOne();
           const totalDevices = +assetsCount.devices;
           const assetGroupByStatusQuery =  assetRepo.createQueryBuilder("assets")
           .select(`count("assets"."id")`,"devices")
           .addSelect(`assets.status`,"status")
           .where(`"assets"."agentId" = :agentId`,{agentId:userDetails.id})
           .addGroupBy("assets.status");
           const assetGroupByTypeQuery =  assetRepo.createQueryBuilder("assets")
           .select(`round(count("assets"."id")::decimal * 100 / ${totalDevices},2)`,"devices")
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
        const summaryInfo = {
            active:0,
            sale:0,
            lost:0,
            rent:0
        }
        const categoryInfo = {
            camera:0,
            screen:0,
            cell_phone:0,
            printer:0
        }
        const activeObj = assetGroupByStatus.find((obj: any) => obj.status === 'Active')
        summaryInfo.active = activeObj?.devices ? activeObj?.devices : '0'
        const saleObj = assetGroupByStatus.find((obj: any) => obj.status === 'For Sale')
        summaryInfo.sale = saleObj?.devices ? saleObj?.devices : '0'
        const lostObj = assetGroupByStatus.find((obj: any) => obj.status === 'Lost')
        summaryInfo.lost = lostObj?.devices ? lostObj?.devices : '0'
        const rentObj = assetGroupByStatus.find((obj: any) => obj.status === 'For Rent')
        summaryInfo.rent = rentObj?.devices ? rentObj?.devices : '0'

        const cameraObj = assetGroupByType.find((obj: any) => obj.type === 'CAMERA')
        categoryInfo.camera = cameraObj?.devices ? cameraObj?.devices : '0'
        const screenObj = assetGroupByType.find((obj: any) => obj.type === 'SCREEN')
        categoryInfo.screen = screenObj?.devices ? screenObj?.devices : '0'
        const cellPhoneObj = assetGroupByType.find((obj: any) => obj.type === 'CELL_PHONE')
        categoryInfo.cell_phone = cellPhoneObj?.devices ? cellPhoneObj?.devices : '0'
        const printerObj = assetGroupByType.find((obj: any) => obj.type === 'PRINTER')
        categoryInfo.printer = printerObj?.devices ? printerObj?.devices : '0'
           
           return ResponseBuilder.data({
            summary:summaryInfo,
            categoryData:categoryInfo,
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