"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookRoute = void 0;
var express_1 = require("express");
var routes_1 = require("../../config/routes");
var webhook_controller_1 = require("./webhook.controller");
// Assign router to the express.Router() instance
var router = (0, express_1.Router)();
var webhookController = new webhook_controller_1.WebhookController();
//Signup
router.post(routes_1.WEBHOOK.PAYSTACK_WEBHOOK, webhookController.acceptTransaction);
exports.WebhookRoute = router;
//# sourceMappingURL=webhook.route.js.map