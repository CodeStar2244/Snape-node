"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
var express_1 = require("express");
var routes_1 = require("../../config/routes");
var agent_controller_1 = require("./agent.controller");
var middleware_1 = require("../../middleware");
var validator_1 = require("../../helpers/validator");
var agent_model_1 = require("./agent.model");
// Assign router to the express.Router() instance
var router = (0, express_1.Router)();
var v = new validator_1.Validator();
var userController = new agent_controller_1.UserController();
//Signup
router.post(routes_1.USER_ROUTES.ENTERPRISE_REGISTER, v.validate(agent_model_1.EnterpriseRegister), userController.enterpriseRegister);
router.post(routes_1.USER_ROUTES.ENTERPRISE_LOGIN, v.validate(agent_model_1.EnterpriseLogin), userController.enterpriseLogin);
router.get(routes_1.USER_ROUTES.GET_REMANING_SPACE, new middleware_1.Middleware().authenticateEnterpriseUser, userController.getRemaningBalance);
exports.UserRoute = router;
//# sourceMappingURL=agent.route.js.map