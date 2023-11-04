import { Request, Response } from "express";
import { AgentPaymentService } from "./agentPayment.service";

export class AgentPaymentController {
    private agentPaymentService = new AgentPaymentService();
    public initiatePayment = async (req, res) => {
        try {
            const result = await this.agentPaymentService.initiatePayment(
                req.body,
                req.user,
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };
    public verifyTransaction = async (req, res) => {
        try {
            const result = await this.agentPaymentService.verifyTransaction(
                req.body,
                req.user,
                req.query
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };
}
