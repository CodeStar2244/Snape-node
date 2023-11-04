"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentPaymentRoute = void 0;
var express_1 = require("express");
var routes_1 = require("../../config/routes");
var validator_1 = require("../../helpers/validator");
var agentPayment_controller_1 = require("./agentPayment.controller");
var agentPayment_model_1 = require("./agentPayment.model");
var router = (0, express_1.Router)();
var agentPaymentController = new agentPayment_controller_1.AgentPaymentController();
var v = new validator_1.Validator();
router.post(routes_1.AGENTPAYMENT_ROUTES.INITIATE_PAYMENT, v.validate(agentPayment_model_1.InitiatePaymentModel), agentPaymentController.initiatePayment);
exports.AgentPaymentRoute = router;
//# sourceMappingURL=agentPayment.route.js.map