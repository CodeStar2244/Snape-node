import { getRepository, Repository } from "typeorm";
import { AppDataSource } from "../../db/db.config";
import { Tblagent } from "../../entities/Tblagent";
import { Jwt } from "../../helpers/jwt";
import { PasswordDecryptor } from "../../helpers/passwordDecryptor";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import AgentSettings, { AgentType } from "../../entities/agentSettings";
import { FREE_ACCOUNT_STORAGE } from "../../config/constants";
import { EnterpriseRegister } from "./agent.model";
import EnterpriseSettings from "../../entities/enterpriseSettings";

export class AgentService {
    private passWordDecrypt: PasswordDecryptor;
    constructor() {
        this.passWordDecrypt = new PasswordDecryptor();
    }

    public async login(email: string, password: string) {
        try {
            const agentRepo = AppDataSource.getRepository(Tblagent);
            const agentSettingsRepo = AppDataSource.getRepository(AgentSettings);


            const agent = await agentRepo.findOne({
                where: {
                    email: email
                }
            });
            if (!agent) {
                throw ResponseBuilder.badRequest('Invalid credentials')
            }
            const agentSettings = await agentSettingsRepo.findOne({
                where:{
                 agentId:{
                     id:agent.id
                 }
                }
             });
             if(agentSettings.type === AgentType.ENTERPRISE){
                throw ResponseBuilder.badRequest("Enterprise Agents not allowd to Studio Suit.")
             }
            const decryptPassword = this.passWordDecrypt.decrypt({ encryptedData: agent.password, iv: agent.iv, key: agent.envkey });
            const userObj = {
                email: agent.email,
                firstName: agent.firstname,
                lastName: agent.lastname,
                id: agent.id,
                gender: agent.gender,
                phone: agent.phone
            }

            if (decryptPassword !== password) {
                throw ResponseBuilder.badRequest("Invalid credentials")

            } else {
                this.generateAgentSettings(agent.id);

                return ResponseBuilder.data({
                    token: Jwt.getAuthToken({ email: agent.email, agentId: agent.id }),
                    user: userObj
                })

            }
        } catch (error) {
            throw error;
        }


    }
    public async enterpriseLogin(email: string, password: string) {
        try {
            const agentRepo = AppDataSource.getRepository(Tblagent);
            const agentSettingsRepo = AppDataSource.getRepository(AgentSettings);

            const agent = await agentRepo.findOne({
                where: {
                    email: email
                }
            });
            if (!agent) {
                throw ResponseBuilder.badRequest('Invalid credentials')
            }
            const agentSettings = await agentSettingsRepo.findOne({
                where:{
                 agentId:{
                     id:agent.id
                 }
                }
             });
             if(agentSettings.type === AgentType.STUDIO){
                throw ResponseBuilder.badRequest("Studio suit Agents not allowd to enterprise.")
             }
            const decryptPassword = this.passWordDecrypt.decrypt({ encryptedData: agent.password, iv: agent.iv, key: agent.envkey });
            const userObj = {
                email: agent.email,
                firstName: agent.firstname,
                lastName: agent.lastname,
                id: agent.id,
                gender: agent.gender,
                phone: agent.phone
            }

            if (decryptPassword !== password) {
                throw ResponseBuilder.badRequest("Invalid credentials")

            } else {
                this.generateAgentSettings(agent.id);

                return ResponseBuilder.data({
                    token: Jwt.getAuthToken({ email: agent.email, agentId: agent.id }),
                    user: userObj
                })

            }
        } catch (error) {
            throw error;
        }


    }
    public async enterpriseRegister(enterPriseAgentObjInfo : EnterpriseRegister) {
        try {
            if(enterPriseAgentObjInfo.confirmPassword !== enterPriseAgentObjInfo.password){
                return ResponseBuilder.badRequest("Password Confirmpassword doesn't match");
            }
            const agentRepo = AppDataSource.getRepository(Tblagent);
            const agentSettingRepo = AppDataSource.getRepository(AgentSettings);
            const enterpricesettingsRepo = AppDataSource.getRepository(EnterpriseSettings);
            const existingAgent = await agentRepo.findOne({
                where:{
                    email:enterPriseAgentObjInfo.email
                }
            })
            if(existingAgent){
                return ResponseBuilder.badRequest("Agent Already exists")
            }
            const encryptedPassword = this.passWordDecrypt.encrypt(enterPriseAgentObjInfo.password);
            const enterpriseAgent = await agentRepo.create({
                email:enterPriseAgentObjInfo.email,
                iv:encryptedPassword.iv,
                password:encryptedPassword.encryptedData,
                envkey:encryptedPassword.key,
                firstname:enterPriseAgentObjInfo.name
            })
            const enterPriseAgentCreated = await agentRepo.save(enterpriseAgent);
            const agentSettingDetails = await agentSettingRepo.create({
                type:AgentType.ENTERPRISE,
                agentId:enterPriseAgentCreated
            })
            agentSettingRepo.save(agentSettingDetails);
            const enterpricesettings = await enterpricesettingsRepo.create({
                agentId:enterPriseAgentCreated,
                userName:enterPriseAgentObjInfo.userName,
                registrationNumber:enterPriseAgentObjInfo.registrationNumber
            })
            enterpricesettingsRepo.save(enterpricesettings);
            return ResponseBuilder.data(enterPriseAgentCreated)
        }

         catch (error) {
            throw error;
        }


    }
    public async getRemaningBalance(userDetails) {
        try {
            const agentSettingsRepo = AppDataSource.getRepository(AgentSettings);
            const agentSettings = await agentSettingsRepo.createQueryBuilder("agentSettings")
                .andWhere("agentSettings.agentId = :agentId", { agentId: userDetails.id }).getOne();
            const dataToSend = { 
                remainingSpace: (agentSettings.totalStorage - +agentSettings.storage).toFixed(2), 
                usedSpace: +agentSettings.storage.toFixed(2), 
                totalAllowedSpace:agentSettings.totalStorage.toFixed(2) 
            }
            return ResponseBuilder.data(dataToSend)


        } catch (error) {
            throw error;
        }


    }

    private async generateAgentSettings(id: number) {
        try {
            const agentSettingRepo = AppDataSource.getRepository(AgentSettings);
            const agentRepo = AppDataSource.getRepository(Tblagent);
            const agentSetting = await agentSettingRepo.findOne({
                where: {
                    agentId: {
                        id
                    }
                }
            });
            if (!agentSetting) {
                const agent = await agentRepo.findOne({
                    where: {
                        id
                    }
                })
                const agentSettingCreate = agentSettingRepo.create({
                    storage: 0,
                    assets: 0,
                    agentId: agent

                })
                agentSettingRepo.save(agentSettingCreate);
            }

        } catch (error) {

        }
    }
}