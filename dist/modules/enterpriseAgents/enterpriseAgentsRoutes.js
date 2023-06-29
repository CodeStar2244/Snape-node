"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseAgentsRouter = void 0;
var express_1 = require("express");
var routes_1 = require("../../config/routes");
var validator_1 = require("../../helpers/validator");
var enterpriseAgentsController_1 = require("./enterpriseAgentsController");
var enterpriseAgentsModel_1 = require("./enterpriseAgentsModel");
var router = (0, express_1.Router)();
var enterpriseAgentsController = new enterpriseAgentsController_1.EnterpriseAgentsController();
var v = new validator_1.Validator();
router.get(routes_1.AGENT_SERVICE.LIST_AGENTS, v.validate(enterpriseAgentsModel_1.AgentGetList), enterpriseAgentsController.getAgentList);
router.get(routes_1.AGENT_SERVICE.LIST_AGENTS_LOCATIONS, v.validate(enterpriseAgentsModel_1.AgentGetList), enterpriseAgentsController.getAgentLocations);
router.get(routes_1.AGENT_SERVICE.GET_AGENT_DETAILS, enterpriseAgentsController.getAgentDetails);
router.get(routes_1.AGENT_SERVICE.GET_AGENT_CATEGORIES, enterpriseAgentsController.getAgentCategories);
exports.EnterpriseAgentsRouter = router;
//# sourceMappingURL=enterpriseAgentsRoutes.js.map