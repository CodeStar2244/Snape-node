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
import { EnterPriseClient } from "../../entities/enterPriseClient";
import bcrypt from 'bcrypt';
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
                where: {
                    agentId: {
                        id: agent.id
                    }
                }
            });
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
            const enterPriseClientRepo = AppDataSource.getRepository(EnterPriseClient);
            const agentSettingsRepo = AppDataSource.getRepository(AgentSettings);
            const enterPriseClient = await enterPriseClientRepo.findOne({
                where: {
                    email: email
                }
            });
            if (!enterPriseClient) {
                throw ResponseBuilder.badRequest('Invalid credentials')
            }
            const passwordCheck = await bcrypt.compare(password,enterPriseClient.password);
            if(!passwordCheck){
                throw ResponseBuilder.badRequest('Invalid credentials')
            }
            const userObj = {
                email: enterPriseClient.email,
                name:enterPriseClient.name,
                id: enterPriseClient.id,
                gender: enterPriseClient.gender,
                phone: enterPriseClient.phone
            }
            this.generateEnterpriseSettings(enterPriseClient.id);

            return ResponseBuilder.data({
                    token: Jwt.getAuthToken({ email: enterPriseClient.email, clientId: enterPriseClient.id }),
                    user: userObj
            })

            
        } catch (error) {
            throw error;
        }


    }
    public async enterpriseRegister(enterPriseAgentObjInfo: EnterpriseRegister) {
        try {
            if (enterPriseAgentObjInfo.confirmPassword !== enterPriseAgentObjInfo.password) {
                return ResponseBuilder.badRequest("Password Confirmpassword doesn't match");
            }
            const enterPriseClientRepo = AppDataSource.getRepository(EnterPriseClient);
            const agentSettingRepo = AppDataSource.getRepository(AgentSettings);
            const enterpricesettingsRepo = AppDataSource.getRepository(EnterpriseSettings);
            const existingAgent = await enterPriseClientRepo.findOne({
                where: {
                    email: enterPriseAgentObjInfo.email
                }
            })
            if (existingAgent) {
                return ResponseBuilder.badRequest("Enterpise Already exists")
            }
            const encryptedPassword = await bcrypt.hash(enterPriseAgentObjInfo.password, 10);
            const enterPriseClient = await enterPriseClientRepo.create({
                email: enterPriseAgentObjInfo.email,
                password: encryptedPassword,
                name:enterPriseAgentObjInfo.name,
                userName: enterPriseAgentObjInfo.userName,
                registrationNumber: enterPriseAgentObjInfo.registrationNumber
            });
            const enterPriseClientCreated = await enterPriseClientRepo.save(enterPriseClient);
            return ResponseBuilder.data(enterPriseClientCreated);
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
                totalAllowedSpace: agentSettings.totalStorage.toFixed(2)
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
    private async generateEnterpriseSettings(id: number) {
        try {
            const enterpriseSettingRepo = AppDataSource.getRepository(EnterpriseSettings);
            const enterpriseClientRepo = AppDataSource.getRepository(EnterPriseClient);
            const enterPriseSetting = await enterpriseSettingRepo.findOne({
                where: {
                    clientId: {
                        id
                    }
                }
            });
            if (!enterPriseSetting) {
                const client = await enterpriseClientRepo.findOne({
                    where: {
                        id
                    }
                })
                const enterPriseSettingCreate = enterpriseSettingRepo.create({
                    storage: 0,
                    assets: 0,
                    clientId: client

                })
                enterpriseSettingRepo.save(enterPriseSettingCreate);
            }

        } catch (error) {

        }
    }
}