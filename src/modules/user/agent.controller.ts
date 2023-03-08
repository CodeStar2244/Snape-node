import { Request, Response } from 'express';
import { AgentService } from './agent.service';


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
}