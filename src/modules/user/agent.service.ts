import { getRepository, Repository } from "typeorm";
import { AppDataSource } from "../../db/db.config";
import { Tblagent } from "../../entities/Tblagent";
import { Jwt } from "../../helpers/jwt";
import { PasswordDecryptor } from "../../helpers/passwordDecryptor";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import AgentSettings from "../../entities/agentSettings";
import { FREE_ACCOUNT_STORAGE } from "../../config/constants";

export class AgentService {
    private passWordDecrypt : PasswordDecryptor;
    constructor(){
        this.passWordDecrypt = new PasswordDecryptor();       
    }
    
    public async login(email:string,password:string){
        try {
        const agentRepo =   AppDataSource.getRepository(Tblagent);
       
        const agent = await agentRepo.findOne({
            where:{
                email:email
            }
        });
        if(!agent){
            throw ResponseBuilder.badRequest('Invalid credentials')
        }
        const decryptPassword = this.passWordDecrypt.decrypt({encryptedData:agent.password,iv:agent.iv,key:agent.envkey});
        const userObj = {
            email:agent.email,
            firstName:agent.firstname,
            lastName:agent.lastname,
            id:agent.id,
            gender:agent.gender,
            phone:agent.phone
        }

        if(decryptPassword !== password){
            throw ResponseBuilder.badRequest("Invalid credentials")

        }else{
            this.generateAgentSettings(agent.id);
            
            return ResponseBuilder.data({
                token: Jwt.getAuthToken({email:agent.email , agentId:agent.id}),
                user:userObj
            })
            
        }
    } catch (error) {
        throw error;            
    }

        
    }
    public async getRemaningBalance(userDetails){
        try {
        const agentSettingsRepo = AppDataSource.getRepository(AgentSettings);
        const agentSettings = await agentSettingsRepo.findOne({
            where:{
                agentId:{
                    id:userDetails.id
                }
            }
        });     
        return ResponseBuilder.data({remainingSpace:(+FREE_ACCOUNT_STORAGE - +agentSettings.storage)})
            
        
    } catch (error) {
        throw error;            
    }

        
    }

    private async generateAgentSettings(id:number){
        try {
            const agentSettingRepo = AppDataSource.getRepository(AgentSettings);
            const agentRepo = AppDataSource.getRepository(Tblagent);
            const agentSetting = await agentSettingRepo.findOne({
                where:{
                    agentId:{
                        id
                    }
                }
            });
            if(!agentSetting){
                const agent = await agentRepo.findOne({
                    where:{
                        id
                    }
                })
                const agentSettingCreate = agentSettingRepo.create({
                    storage:0,
                    assets:0,
                    agentId:agent

                })
                agentSettingRepo.save(agentSettingCreate);
            }
            
        } catch (error) {
            
        }
    }
}