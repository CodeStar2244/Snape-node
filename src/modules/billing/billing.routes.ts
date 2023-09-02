import { Router } from "express";
import { COLLECTION_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { BillingController } from "./billing.controller";

const router: Router = Router();
const billingController = new BillingController();
const v: Validator = new Validator();

router.post(
  COLLECTION_ROUTES.CREATE_COLLECTION,
  billingController.initiateTransaction,
);
export const billingRouter: Router = router;
