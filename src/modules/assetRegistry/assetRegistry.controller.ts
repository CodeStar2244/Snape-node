import { Request, Response } from "express";
import { AssetRegistryService } from "./assetRegistry.service";

export class AssetRegistryController{
    private assetRegistryService = new AssetRegistryService()
    public createAsset = async (req:any,res:Response)=>{
        try {
            const userDetails = req.user;
            const result = await this.assetRegistryService.createAsset(req.body,userDetails)
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public getAssets = async (req:any,res:Response)=>{
        try {
            const userDetails = req.user;
            const result = await this.assetRegistryService.getAssets(userDetails,req.query)
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
}