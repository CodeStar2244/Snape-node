"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioManagementRouter = void 0;
var express_1 = require("express");
var routes_1 = require("../../config/routes");
var validator_1 = require("../../helpers/validator");
var studioManagement_controller_1 = require("./studioManagement.controller");
var studioManagement_model_1 = require("./studioManagement.model");
var studioManagement_middleware_1 = require("./studioManagement.middleware");
var router = (0, express_1.Router)();
var studioManagementController = new studioManagement_controller_1.StudioManagementController();
var studioManagementMiddleware = new studioManagement_middleware_1.StudioManagementMiddleware();
var v = new validator_1.Validator();
router.get(routes_1.STUDIO_MANAGEMENT_ROUTES.GET_CLIENTS, studioManagementController.getClient);
router.get(routes_1.STUDIO_MANAGEMENT_ROUTES.GET_CLIENT, studioManagementController.getSingleClient);
router.post(routes_1.STUDIO_MANAGEMENT_ROUTES.CREATE_CLIENT, v.validate(studioManagement_model_1.CreateStudioClientModel), studioManagementController.createClient);
router.post(routes_1.STUDIO_MANAGEMENT_ROUTES.UPDATE_CLIENT, v.validate(studioManagement_model_1.UpdateStudioClientModel), studioManagementController.updateClient);
router.delete(routes_1.STUDIO_MANAGEMENT_ROUTES.DELETE_CLIENT, studioManagementController.deleteClient);
//Add Speciality
router.post(routes_1.SPECIALITY_ROUTES.CREATE_SPECIALITY, v.validate(studioManagement_model_1.CreateSpeciality), studioManagementController.addSpeciality);
//Get Speciality
router.get(routes_1.SPECIALITY_ROUTES.GET_SPECIALITY, studioManagementController.getSpeciality);
//Edit Speciality
router.post(routes_1.SPECIALITY_ROUTES.EDIT_SPECIALITY, v.validate(studioManagement_model_1.UpdateSpeciality), studioManagementMiddleware.isSpecialityNotExists, studioManagementController.editSpeciality);
//Delete Speciality
router.delete(routes_1.SPECIALITY_ROUTES.DELETE_SPECIALITY, studioManagementMiddleware.isSpecialityNotExists, studioManagementController.deleteSpeciality);
router.get(routes_1.TEMPLATES_ROUTES.GET_TEMPLATE, v.validate(studioManagement_model_1.GetTemplates), studioManagementController.getTemplates);
router.post(routes_1.TEMPLATES_ROUTES.ADD_UPDATE_TEMPLATE, v.validate(studioManagement_model_1.CreateTemplate), studioManagementController.createTemplate);
router.post(routes_1.QUESTIONNARIES_ROUTES.CREATE_QUESTIONNARIES, v.validate(studioManagement_model_1.CreateQuestionnaries), studioManagementController.createQuestionnaries);
router.get(routes_1.QUESTIONNARIES_ROUTES.GET_QUESTIONNARIES, studioManagementController.getQuestionnaries);
router.get(routes_1.QUESTIONNARIES_ROUTES.GET_CLIENT_QUESTIONNARIES, studioManagementController.getClientQuestionnaries);
router.delete(routes_1.QUESTIONNARIES_ROUTES.DELETE_QUESTIONNARIES, studioManagementController.deleteQuestionnaries);
exports.StudioManagementRouter = router;
//# sourceMappingURL=studioManagement.routes.js.map