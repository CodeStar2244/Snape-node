import { AppDataSource } from "../../db/db.config";
import EnterpriseAssets from "../../entities/enterpriseAssets";
import EnterPriseSettings from "../../entities/enterpriseSettings";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { AssetCreateModel, AssetUpdateModel } from "./enterpriseAssetRegistry.model";
export class EnterpriseAssetRegistryService {
    public createAsset = async (body:AssetCreateModel,userDetails) => {
        try {
           const assetRepo = AppDataSource.getRepository(EnterpriseAssets);
           const asset = assetRepo.create({
            nickName:body.nickName,
            deviceAmount:body.deviceAmount,
            deviceID:body.deviceID,
            type:body.type,
            clientId:userDetails.id
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
           const {search,sort,order,status} = params;
           const assetRepo = AppDataSource.getRepository(EnterpriseAssets);
           const assetsquery =  assetRepo.createQueryBuilder("assets")
           .where(`"assets"."clientId" = :clientId`,{clientId:userDetails.id})
           if(status){
            assetsquery.andWhere("assets.status =:status",{status:params.status})
           }
           if (search) {
            assetsquery.andWhere('assets.nickName ILIKE :name', { name: `%${search}%` })
           }
           if (sort && order) {
            assetsquery.addOrderBy(`assets.${sort}`, order.toUpperCase())
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
           const assetRepo = AppDataSource.getRepository(EnterpriseAssets);
           const agentSettingRepo = AppDataSource.getRepository(EnterPriseSettings);
           const assetsCount =  await assetRepo.createQueryBuilder("assets")
           .select(`count("assets"."id")`,"devices")
           .where(`"assets"."clientId" = :clientId`,{clientId:userDetails.id}).getRawOne();
           const totalDevices = +assetsCount.devices;
           const assetGroupByStatusQuery =  assetRepo.createQueryBuilder("assets")
           .select(`count("assets"."id")`,"devices")
           .addSelect(`assets.status`,"status")
           .where(`"assets"."clientId" = :clientId`,{clientId:userDetails.id})
           .addGroupBy("assets.status");
           const assetGroupByTypeQuery =  assetRepo.createQueryBuilder("assets")
           .select(`round(count("assets"."id")::decimal * 100 / ${totalDevices},2)`,"devices")
           .addSelect(`assets.type`,"type")
           .where(`"assets"."clientId" = :clientId`,{clientId:userDetails.id})
           .addGroupBy("assets.type");
           const getAssetAmountsPromise = agentSettingRepo.findOne({
            where:{
                clientId:{
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
           const assetRepo = AppDataSource.getRepository(EnterpriseAssets);
           const assetsquery =  assetRepo.createQueryBuilder("assets")
           .where(`"assets"."clientId" = :clientId`,{clientId:userDetails.id})
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