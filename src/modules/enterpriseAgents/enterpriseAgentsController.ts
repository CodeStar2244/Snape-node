import { Request, Response } from "express";
import { EnterpriseAgentsService } from "./enterpriseAgentsService";

export class EnterpriseAgentsController{
    private enterpriseAgentsService = new EnterpriseAgentsService()
    public getAgentList = async (req:any,res:Response)=>{
        try {
            const userDetails = req.user;
            const result = await this.enterpriseAgentsService.getAgents(req.query,userDetails);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
   
}