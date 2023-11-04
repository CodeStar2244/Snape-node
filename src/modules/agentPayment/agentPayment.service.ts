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

export class AgentPaymentService {
    public initiatePayment = async (body, userDetails) => {
        try {
            const paymentUrl = await this.generatePaymentLink(body.amount, userDetails.email, userDetails.id);
            return ResponseBuilder.data({ paymentUrl })
        }
        catch (error) {
            throw ResponseBuilder.error(error);
        }
    };

    private generatePaymentLink = async (amount, email, agentId) => {
        try {
            const transactions = AppDataSource.getRepository(Transactions);
            const additionalDetails = {
                agentId
            }
            const paymentDetails = {
                amount,
                email,
                currency: process.env.CURRENCY,
                callback_url: process.env.PAYSTACK_CALLBACK,
                metadata: JSON.stringify(additionalDetails),
                plan: "PLN_ulcpelooub9i6mi"
            }
            const headers = {
                authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
            }
            const { data: { data } } = await axios.post(process.env.PAYSTACK_API_URL + "initialize", paymentDetails, { headers });
            const newTransaction = transactions.create({
                agentId,
                amount,
                referenceId: data.reference,
                transactionId: data.reference,
            });
            transactions.save(newTransaction);
            return data.authorization_url;
        } catch (error) {
            throw error
        }
    }
    public verifyTransaction = async (referenceId,userDetails,query) => {
        try {
            const transactionsRepo = AppDataSource.getRepository(Transactions);
            const transaction = await transactionsRepo.findOne({
                where: {
                    referenceId
                }
            })
            if (!transaction) {
                return ResponseBuilder.badRequest("Transaction Not Found with this Reference Id")
            }
            const headers = {
                authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
            }
            const { data: { data } } = await axios.get(process.env.PAYSTACK_API_URL + `verify/${transaction.referenceId}`, { headers });
            if (data.status === "success") {
                await transactionsRepo.update(transaction.id,{status:data.status});
                await this.updateAgentPlanDetails(transaction.agentId,transaction.planId,transaction.referenceId)
                return ResponseBuilder.data({
                    status:data.status,
                    isSuccess:true
                })
            } else if(data.status === "failed") {
                return ResponseBuilder.data({
                    status:data.status,
                    isSuccess:false
                })
            }
        } catch (error) {
            throw error
        }
    }

    private updateAgentPlanDetails = async (agentId, planId, referenceId) => {
        try {
            const agentPlansRepo = AppDataSource.getRepository(AgentPlans);
            const transactionsRepo = AppDataSource.getRepository(Transactions);

            const transaction = await transactionsRepo.findOne({
                where: {
                    referenceId,
                    status: "Success"
                }
            })
            if (!transaction) {
                return ResponseBuilder.badRequest("Transaction Not Found with this Reference Id")
            }
            const agentPlan = await agentPlansRepo.findOne({
                where: {
                    agentId: { id: agentId },
                    planId: { id: planId }
                }
            });
            if (!agentPlan) {
                const validTill = moment(transaction.succeededAt).add(1, "month");
                const newAgentPlan = agentPlansRepo.create({
                    agentId: agentId,
                    planId: planId,
                    validTill
                });
                await agentPlansRepo.save(newAgentPlan);
            } else {
                const validTill = moment(transaction.succeededAt).add(1, "month");
                agentPlansRepo.update(agentPlan.id, { validTill })
            }
        } catch (error) {

        }
    }
}
