"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioManagementRouter = void 0;
var express_1 = require("express");
var routes_1 = require("../../config/routes");
var validator_1 = require("../../helpers/validator");
var studioManagement_controller_1 = require("./studioManagement.controller");
var studioManagement_model_1 = require("./studioManagement.model");
var router = (0, express_1.Router)();
var studioManagementController = new studioManagement_controller_1.StudioManagementController();
var v = new validator_1.Validator();
router.get(routes_1.STUDIO_MANAGEMENT_ROUTES.GET_CLIENTS, studioManagementController.getClient);
router.get(routes_1.STUDIO_MANAGEMENT_ROUTES.GET_CLIENT, studioManagementController.getSingleClient);
router.post(routes_1.STUDIO_MANAGEMENT_ROUTES.CREATE_CLIENT, v.validate(studioManagement_model_1.CreateStudioClientModel), studioManagementController.createClient);
router.delete(routes_1.STUDIO_MANAGEMENT_ROUTES.DELETE_CLIENT, studioManagementController.deleteClient);
exports.StudioManagementRouter = router;
//# sourceMappingURL=studioManagement.routes.js.map