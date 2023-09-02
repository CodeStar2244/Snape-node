'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.billingRouter = void 0;
var express_1 = require('express');
var routes_1 = require('../../config/routes');
var validator_1 = require('../../helpers/validator');
var billing_controller_1 = require('./billing.controller');
var router = (0, express_1.Router)();
var billingController = new billing_controller_1.BillingController();
var v = new validator_1.Validator();
router.post(routes_1.COLLECTION_ROUTES.CREATE_COLLECTION, billingController.initiateTransaction);
exports.billingRouter = router;
//# sourceMappingURL=billing.routes.js.map