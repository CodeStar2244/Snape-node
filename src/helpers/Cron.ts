import { CronJob } from "cron";
import { StudioManagementService } from "..//modules/studioManagement/studioManagement.service";
import { AppDataSource } from "../db/db.config";
import AgentPlans from "../entities/agentPlans";
import moment from "moment";
import { LessThan, MoreThan } from "typeorm";
import AgentSettings from "../entities/agentSettings";
import Plans from "../entities/plans";

export class Cron {
  public studioManagementService: StudioManagementService;
  constructor() {
    this.dailyCron();
    this.studioManagementService = new StudioManagementService();
  }

  public dailyCron = () => {
    new CronJob("1 0 * * *", this.cronFunctions, null, true);
  };

  private cronFunctions = () => {
    console.log("Midnight Function RUN");
    this.studioManagementService.cronDuePayment();
    this.expirePlans();
  };

  public expirePlans = async () => {
    try {
      const agentPlansRepo = AppDataSource.getRepository(AgentPlans);
      const agentSettingRepo = AppDataSource.getRepository(AgentSettings);
      const planRepo = AppDataSource.getRepository(Plans);
      const dateNow = new Date();
      const plansNeedToExpire = await agentPlansRepo.find({
        where: {
          validTill: LessThan(dateNow),
          isExpired: false,
        },
        relations: ["agentId"],
      });
      for (const plan of plansNeedToExpire) {
        const agentSetting = await agentSettingRepo.findOne({
          where: {
            agentId: {
              id: plan.agentId.id,
            },
          },
        });
        console.log(plan.agentId.id, "id");
        console.log(agentSetting, "settings");
        await agentSettingRepo.update(agentSetting.id, {
          totalStorage: 3072,
          currentPlan: { id: 1 },
        });
        await agentPlansRepo.update(plan.id, {
          isExpired: true,
        });
      }

      const plansNeedToCheck = await agentPlansRepo.find({
        where: {
          validTill: MoreThan(dateNow),
          isExpired: false,
        },
        relations: ["agentId", "planId"],
      });
      for (const plan of plansNeedToCheck) {
        const agentSetting = await agentSettingRepo.findOne({
          where: {
            agentId: {
              id: plan.agentId.id,
            },
          },
        });
        const planDetail = await planRepo.findOne({
          where: {
            id: plan.planId.id,
          },
        });
        await agentSettingRepo.update(agentSetting.id, {
          totalStorage: planDetail.storageInPlan,
          currentPlan: planDetail,
        });
      }
    } catch (error) {
      console.log(error, "erorr");
    }
  };
}
