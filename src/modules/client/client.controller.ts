import { Request } from "express";
import { ClientService } from "./client.service";

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
}