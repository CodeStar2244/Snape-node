import { getRepository, Repository } from "typeorm";
import { AppDataSource } from "../..";
import { Tblagent } from "../../entities/Tblagent";
import { Jwt } from "../../helpers/jwt";
import { PasswordDecryptor } from "../../helpers/passwordDecryptor";
import { ResponseBuilder } from "../../helpers/responseBuilder";

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
            return ResponseBuilder.data({
                token: Jwt.getAuthToken({email:agent.email , agentId:agent.id}),
                user:userObj
            })
            
        }
    } catch (error) {
        throw error;            
    }

        
    }
}