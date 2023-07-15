import { Request, Response } from "express";
import { ClientService } from "./client.service";
import { ResponseBuilder } from "../../helpers/responseBuilder";

export class ClientController{
    private clientService = new ClientService()
    public getCollectionByUrl = async (req,res)=>{
        try {
            const result = await this.clientService.getCollectionByUrl(req.body);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public downloadFile = async (req,res:Response)=>{
        try {
            const result = await this.clientService.downloadFile(req.user,req.params.id,req.body,res);
            if(result instanceof ResponseBuilder){
                return res.status(result.code).json(result);
            }else{
                res.header("Access-Control-Expose-Headers", "fileName , fileExt");
                res.setHeader('Content-Disposition',`attachment; filename=${result.name}`)
                res.setHeader('fileName',`${result.name}`)
                res.setHeader('fileExt',`${result.mime}`)
                result.result.pipe(res);
            
            }
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public downloadCollection = async (req,res:Response)=>{
        try {
            const result = await this.clientService.downloadCollection(req.user,req.params.id,req.body,res);
            if(result instanceof ResponseBuilder){
                return res.status(result.code).json(result);
            }else{
                res.header("Access-Control-Expose-Headers", "fileName , fileExt");
                res.setHeader('fileName',`${result.name}.zip`)
                result.zipFile.pipe(res).on("error",(e)=>{
                    console.log(e , "err")
                }).on("finish",()=>{                    
                });
            }
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }

    public downloadPinCheck = async (req,res:Response)=>{
        try {
            const result = await this.clientService.downloadPinCheck(req.user,req.params.id,req.body,res);
            console.log(result) 
            if(result.code === 200){
                return res.status(result.code).json(result.result);

            }else{
              return res.status(result.code).json(result.error);
            }
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public downloadFilePinCheck = async (req,res:Response)=>{
        try {
            const result = await this.clientService.downloadFilePinCheck(req.user,req.params.id,req.body,res);
             return res.status(result.code).json(result.result);
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
}