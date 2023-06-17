import { Request, Response } from "express";
import { EnterpriseAssetRegistryService } from "./enterpriseAssetRegistry.service";

export class EnterpriseAssetRegistryController{
    private assetRegistryService = new EnterpriseAssetRegistryService()
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
    public updateAsset = async (req:any,res:Response)=>{
        try {
            const userDetails = req.user;
            const result = await this.assetRegistryService.updateAsset(userDetails,req.params,req.body)
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public assetDashboard = async (req:any,res:Response)=>{
        try {
            const userDetails = req.user;
            const result = await this.assetRegistryService.assetDashboard(userDetails)
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
}