import moment from "moment";
import { PAYSTACK_STATUS } from "../..//config/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { AppDataSource } from "../../db/db.config";
import AgentPlans from "../../entities/agentPlans";
import Transactions from "../../entities/transactions";
import AgentSettings from "../../entities/agentSettings";

export class WebhookService {
  public async acceptTransaction(body: any) {
    try {
      const referenceId = body?.data?.reference;
      const transactionsRepo = AppDataSource.getRepository(Transactions);
      const transaction = await transactionsRepo.findOne({
        where: {
          referenceId,
          status: "ongoing",
        },
        relations: ["agentId", "planId"],
      });
      if (!transaction) {
        return ResponseBuilder.badRequest(
          "Transaction Not Found with this Reference Id",
        );
      }
      if (body?.data?.status === PAYSTACK_STATUS.SUCCESS) {
        await transactionsRepo.update(transaction.id, {
          status: body?.data?.status,
          succeededAt: moment(body?.data?.paid_at),
        });
        await this.updateAgentPlanDetails(
          transaction.agentId,
          transaction.planId,
          transaction.referenceId,
        );
      } else if (body?.data?.status === PAYSTACK_STATUS.FAILED) {
        await transactionsRepo.update(transaction.id, {
          status: body?.data?.status,
          succeededAt: moment(body?.data?.paid_at),
        });
      }
      return ResponseBuilder.data({ msg: true });
    } catch (error) {
      console.log(error, "------error----");

      throw error;
    }
  }

  private updateAgentStorage = async (agent, storage, plan) => {
    try {
      const agentSettingsRepo = AppDataSource.getRepository(AgentSettings);
      const agentSetting = await agentSettingsRepo.findOne({
        where: {
          agentId: {
            id: agent,
          },
        },
      });
      await agentSettingsRepo.update(agentSetting.id, {
        totalStorage: storage,
        currentPlan: plan,
      });
    } catch (error) {
      throw error;
    }
  };

  private updateAgentPlanDetails = async (agentId, planId, referenceId) => {
    try {
      const agentPlansRepo = AppDataSource.getRepository(AgentPlans);
      const transactionsRepo = AppDataSource.getRepository(Transactions);

      const transaction = await transactionsRepo.findOne({
        where: {
          referenceId,
          status: "success",
        },
      });
      if (!transaction) {
        return ResponseBuilder.badRequest(
          "Transaction Not Found with this Reference Id",
        );
      }
      const agentPlan = await agentPlansRepo.findOne({
        where: {
          agentId: { id: agentId.id },
          planId: { id: planId.id },
        },
      });
      if (!agentPlan) {
        const validTill = moment(transaction.succeededAt).add(1, "month");
        const newAgentPlan = agentPlansRepo.create({
          agentId: agentId.id,
          planId: planId.id,
          validTill,
        });
        await agentPlansRepo.save(newAgentPlan);
      } else {
        const validTill = moment(transaction.succeededAt).add(1, "month");
        agentPlansRepo.update(agentPlan.id, { validTill });
      }
      this.updateAgentStorage(agentId.id, planId.storageInPlan, planId);
    } catch (error) {
      throw error;
    }
  };
}
