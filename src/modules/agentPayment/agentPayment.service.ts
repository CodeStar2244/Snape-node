import { AppDataSource } from "../../db/db.config";
import Portfolios from "../../entities/Portfolio";
import { AWSS3 } from "../../helpers/awss3";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { AgentService } from "../user/agent.service";
import { uuid } from "uuidv4";
import { Utils } from "../../utils/utils";
import { Tblagent } from "../../entities/Tblagent";
import axios from "axios";
import Transactions from "../../entities/transactions";
import AgentPlans from "../../entities/agentPlans";
import moment from "moment";
import Plans from "../../entities/plans";
import AgentSettings from "../../entities/agentSettings";
import { PAYSTACK_STATUS } from "../../config/constants";

export class AgentPaymentService {
  public initiatePayment = async (body, userDetails) => {
    try {
      const agentPlanRepo = AppDataSource.getRepository(AgentPlans);
      const agentPlan = await agentPlanRepo.findOne({
        where: {
          agentId: {
            id: userDetails.id,
          },
        },
        relations: ["planId"],
        order: {
          id: "DESC",
        },
      });
      if (agentPlan) {
        if (moment().isBefore(agentPlan.validTill)) {
          return ResponseBuilder.badRequest(
            `${agentPlan.planId.name} is Already Active for this user`,
          );
        }
      }
      const { reference, authorization_url } = await this.generatePaymentLink(
        userDetails.email,
        userDetails.id,
        body.planId,
      );
      return ResponseBuilder.data({ paymentUrl: authorization_url, reference });
    } catch (error) {
      console.log(error, "error");
      throw ResponseBuilder.error(error);
    }
  };

  private generatePaymentLink = async (email, agentId, planId) => {
    try {
      const transactions = AppDataSource.getRepository(Transactions);
      const planRepo = AppDataSource.getRepository(Plans);
      const plan = await planRepo.findOne({
        where: {
          id: planId,
        },
      });
      const additionalDetails = {
        agentId,
        planId,
      };
      const paymentDetails = {
        email,
        currency: process.env.PAYSTACK_CURRENCY,
        callback_url: process.env.PAYSTACK_CALLBACK,
        metadata: JSON.stringify(additionalDetails),
        amount: plan.amountPerMonth * 100,
      };
      const headers = {
        authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      };
      const {
        data: { data },
      } = await axios.post(
        process.env.PAYSTACK_API_URL + "initialize",
        paymentDetails,
        { headers },
      );
      const newTransaction = transactions.create({
        agentId,
        amount: plan.amountPerMonth,
        referenceId: data.reference,
        transactionId: data.reference,
        planId: plan,
      });
      transactions.save(newTransaction);
      return {
        authorization_url: data.authorization_url,
        reference: data.reference,
      };
    } catch (error) {
      console.log(error, "error");
      throw error;
    }
  };
  public verifyTransaction = async (body, userDetails, query) => {
    try {
      const referenceId = query.reference;
      const transactionsRepo = AppDataSource.getRepository(Transactions);
      const transaction = await transactionsRepo.findOne({
        where: {
          referenceId,
          agentId: {
            id: userDetails.id,
          },
        },
        relations: ["agentId", "planId"],
      });
      if (!transaction) {
        return ResponseBuilder.badRequest(
          "Transaction Not Found with this Reference Id",
        );
      }
      const headers = {
        authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      };
      const {
        data: { data },
      } = await axios.get(
        process.env.PAYSTACK_API_URL + `verify/${transaction.referenceId}`,
        { headers },
      );
      if (data.status === PAYSTACK_STATUS.SUCCESS) {
        return ResponseBuilder.data({
          status: data.status,
          isSuccess: true,
          isPending: false,
        });
      } else if (data.status === PAYSTACK_STATUS.FAILED) {
        return ResponseBuilder.data({
          status: data.status,
          isSuccess: false,
          isPendig: false,
        });
      } else if (data.status === PAYSTACK_STATUS.ONGOING) {
        return ResponseBuilder.data({
          status: data.status,
          isSuccess: false,
          isPending: true,
        });
      }
    } catch (error) {
      throw ResponseBuilder.error(error);
    }
  };
  public getPlanDetail = async (body, userDetails) => {
    try {
      const agentPlanRepo = AppDataSource.getRepository(AgentPlans);
      const agentSettingsRepo = AppDataSource.getRepository(AgentSettings);
      const agentPlan = await agentPlanRepo.findOne({
        where: {
          agentId: {
            id: userDetails.id,
          },
        },
        relations: ["planId"],
      });
      const agentSetting = await agentSettingsRepo.findOne({
        where: {
          agentId: {
            id: userDetails.id,
          },
        },
      });
      const dataToSend = JSON.parse(JSON.stringify(agentPlan));
      dataToSend.storageUsed = agentSetting.storage;
      dataToSend.totalStorage = agentSetting.totalStorage;
      dataToSend.remainingStorage =
        agentSetting.totalStorage - agentSetting.storage;
      dataToSend.daysLeft = moment(agentPlan.validTill).diff(moment(), "days");
      return ResponseBuilder.data(dataToSend);
    } catch (error) {
      throw ResponseBuilder.error(error);
    }
  };
}
