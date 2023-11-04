import { Router } from "express";
import { AGENTPAYMENT_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { AgentPaymentController } from "./agentPayment.controller";
import { InitiatePaymentModel } from "./agentPayment.model";

const router: Router = Router();
const agentPaymentController = new AgentPaymentController();
const v: Validator = new Validator();

router.post(
  AGENTPAYMENT_ROUTES.INITIATE_PAYMENT,
  v.validate(InitiatePaymentModel),
  agentPaymentController.initiatePayment,
);
router.get(
  AGENTPAYMENT_ROUTES.VERIFY_PAYMENT,
  agentPaymentController.verifyTransaction,
);

export const AgentPaymentRoute: Router = router;
