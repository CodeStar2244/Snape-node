import { Request } from "express";
import { BillingService } from "./billing.service";

export class BillingController{
    private clientService = new BillingService()
    public initiateTransaction = async (req,res)=>{
        try {
            const userDetails = req.user;
            const result = await this.clientService.initiateTransaction(userDetails,req.body);
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
}