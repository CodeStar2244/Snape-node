import { Router } from "express";
import { WEBHOOK } from "../../config/routes";
import { WebhookController } from "./webhook.controller";

// Assign router to the express.Router() instance
const router: Router = Router();
const webhookController = new WebhookController();

//Signup
router.post(WEBHOOK.PAYSTACK_WEBHOOK, webhookController.acceptTransaction);
export const WebhookRoute: Router = router;
