import { AppDataSource } from "../../db/db.config";
import Assets from "../../entities/assets";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { AssetCreateModel } from "./assetRegistry.model";
export class AssetRegistryService {
    public createAsset = async (body:AssetCreateModel,userDetails) => {
        try {
           const assetRepo = AppDataSource.getRepository(Assets);
           const asset = assetRepo.create({
            nickName:body.nickName,
            deviceAmount:body.deviceAmount,
            deviceID:body.deviceID,
            type:body.type
           })
           assetRepo.save(asset);
           return ResponseBuilder.data(asset)
        }  catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }
    }
    
   

}