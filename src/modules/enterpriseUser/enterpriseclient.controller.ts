import { Request, Response } from 'express';
import { EnterpriseClientService } from './enterpriseclient.service';
import { EnterpriseRegister } from './enterpriseclient.model';


export class UserController {
    private enterpriseclientService:EnterpriseClientService;
    constructor(){
        this.enterpriseclientService = new EnterpriseClientService();
    }
    
    public enterpriseLogin = async (req,res)=>{
        try {
            const {email ,password} =  req.body;
            const data = await this.enterpriseclientService.enterpriseLogin(email,password)
            return res.status(data.code).json(data);
            
        } catch (error) {
            return res.status(error.code).json(error);          
        }
       
    }
    public enterpriseRegister = async (req,res)=>{
        try {
            const enterpriseAgent = new EnterpriseRegister(req.body,req.params);
            const data = await this.enterpriseclientService.enterpriseRegister(enterpriseAgent)
            return res.status(data.code).json(data);
            
        } catch (error) {
            return res.status(error.code).json(error);          
        }
       
    }
    public getRemaningBalance = async (req,res)=>{
        try {
            const data = await this.enterpriseclientService.getEnterpriseRemaningBalance(req.user)
            return res.status(data.code).json(data);
            
        } catch (error) {
            return res.status(error.code).json(error);          
        }
       
    }
}