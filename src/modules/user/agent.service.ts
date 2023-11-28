import { getRepository, Repository } from "typeorm";
import { AppDataSource } from "../../db/db.config";
import { Tblagent } from "../../entities/Tblagent";
import { Jwt } from "../../helpers/jwt";
import { PasswordDecryptor } from "../../helpers/passwordDecryptor";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import AgentSettings, { AgentType } from "../../entities/agentSettings";
import { FREE_ACCOUNT_STORAGE } from "../../config/constants";
import EnterpriseSettings from "../../entities/enterpriseSettings";
import { EnterPriseClient } from "../../entities/enterPriseClient";
import bcrypt from "bcrypt";
import { Tblimages } from "../../entities/Tblimages";
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
          email: email,
        },
      });

      if (!agent) {
        throw ResponseBuilder.badRequest("Invalid credentials");
      }
      const agentSettings = await agentSettingsRepo.findOne({
        where: {
          agentId: {
            id: agent.id,
          },
        },
      });
      const decryptPassword = this.passWordDecrypt.decrypt({
        encryptedData: agent.password,
        iv: agent.iv,
        key: agent.envkey,
      });
      const userObj = {
        email: agent.email,
        firstName: agent.firstname,
        lastName: agent.lastname,
        id: agent.id,
        gender: agent.gender,
        phone: agent.phone,
      };

      if (decryptPassword !== password) {
        throw ResponseBuilder.badRequest("Invalid credentials");
      } else {
        this.generateAgentSettings(agent.id);

        return ResponseBuilder.data({
          token: Jwt.getAuthToken({ email: agent.email, agentId: agent.id }),
          user: userObj,
        });
      }
    } catch (error) {
      console.log(error, "------error----");

      throw error;
    }
  }

  public async getRemaningBalance(userDetails) {
    try {
      const agentSettingsRepo = AppDataSource.getRepository(AgentSettings);
      const agentSettings = await agentSettingsRepo
        .createQueryBuilder("agentSettings")
        .andWhere("agentSettings.agentId = :agentId", {
          agentId: userDetails.id,
        })
        .getOne();
      const dataToSend = {
        remainingSpace: (
          agentSettings.totalStorage - +agentSettings.storage
        ).toFixed(2),
        usedSpace: +agentSettings.storage.toFixed(2),
        totalAllowedSpace: agentSettings.totalStorage.toFixed(2),
      };
      return ResponseBuilder.data(dataToSend);
    } catch (error) {
      throw error;
    }
  }
  public async getAgentProfile(userDetails) {
    try {
      console.log("riun");
      const agentRepo = AppDataSource.getRepository(Tblagent);
      const imageRepo = AppDataSource.getRepository(Tblimages);
      const agent = await agentRepo.findOne({
        where: {
          id: userDetails.id,
        },
        select: [
          "bio",
          "id",
          "firstname",
          "lastname",
          "email",
          "phone",
          "gender",
          "location",
          "timezone",
          "businessName",
        ],
      });
      const profileImage = await imageRepo.findOne({
        where: {
          entityid: agent.id,
          entitytype: "agent",
        },
      });
      const agentToSend = {
        ...agent,
        profile: profileImage?.imagepath,
      };
      console.log(profileImage, "profileIMage");

      return ResponseBuilder.data(agentToSend);
    } catch (error) {
      console.log(error, "Error");
      throw error;
    }
  }
  public async updateAgentProfile(userDetails, body) {
    try {
      const agentRepo = AppDataSource.getRepository(Tblagent);
      const agent = await agentRepo.findOne({
        where: {
          id: userDetails.id,
        },
        select: ["id", "firstname", "lastname"],
      });
      if (!agent) {
        return ResponseBuilder.badRequest("Agent Not found");
      }
      await agentRepo.update(agent.id, {
        bio: body.bio,
        location: body.location,
        timezone: body.timezone,
        firstname: body.firstname,
        lastname: body.lastname,
        businessName: body.businessName,
      });
      return ResponseBuilder.data(agent);
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
            id,
          },
        },
      });
      if (!agentSetting) {
        const agent = await agentRepo.findOne({
          where: {
            id,
          },
        });
        const agentSettingCreate = agentSettingRepo.create({
          storage: 0,
          assets: 0,
          agentId: agent,
        });
        agentSettingRepo.save(agentSettingCreate);
      }
    } catch (error) {}
  }
}
