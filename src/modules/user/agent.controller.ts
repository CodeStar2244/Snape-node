import { Request, Response } from 'express';
import { AgentService } from './agent.service';
import { EnterpriseRegister } from './agent.model';


export class UserController {
    private agentService:AgentService;
    constructor(){
        this.agentService = new AgentService();
    }
    public login = async (req,res)=>{
        try {
            const {email ,password} =  req.body;
            const data = await this.agentService.login(email,password)
            return res.status(data.code).json(data);
            
        } catch (error) {
            return res.status(error.code).json(error);          
        }
       
    }
    public enterpriseLogin = async (req,res)=>{
        try {
            const {email ,password} =  req.body;
            const data = await this.agentService.enterpriseLogin(email,password)
            return res.status(data.code).json(data);
            
        } catch (error) {
            return res.status(error.code).json(error);          
        }
       
    }
    public enterpriseRegister = async (req,res)=>{
        try {
            const enterpriseAgent = new EnterpriseRegister(req.body,req.params);
            const data = await this.agentService.enterpriseRegister(enterpriseAgent)
            return res.status(data.code).json(data);
            
        } catch (error) {
            return res.status(error.code).json(error);          
        }
       
    }
    public getRemaningBalance = async (req,res)=>{
        try {
            const data = await this.agentService.getRemaningBalance(req.user)
            return res.status(data.code).json(data);
            
        } catch (error) {
            return res.status(error.code).json(error);          
        }
       
    }
}