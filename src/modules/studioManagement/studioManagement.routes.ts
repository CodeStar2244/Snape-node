import { Router } from "express";
import { STUDIO_MANAGEMENT_ROUTES, SPECIALITY_ROUTES, TEMPLATES_ROUTES, QUESTIONNARIES_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { StudioManagementController } from "./studioManagement.controller";
import { CreateStudioClientModel, CreateSpeciality, GetSpeciality, UpdateSpeciality, UpdateStudioClientModel, GetTemplates, CreateTemplate, CreateQuestionnaries } from "./studioManagement.model";
import { StudioManagementMiddleware } from './studioManagement.middleware';

const router: Router = Router();
const studioManagementController = new StudioManagementController();
const studioManagementMiddleware = new StudioManagementMiddleware();
const v: Validator = new Validator();

router.get(STUDIO_MANAGEMENT_ROUTES.GET_CLIENTS, studioManagementController.getClient);
router.get(STUDIO_MANAGEMENT_ROUTES.GET_CLIENT, studioManagementController.getSingleClient);
router.post(STUDIO_MANAGEMENT_ROUTES.CREATE_CLIENT, v.validate(CreateStudioClientModel), studioManagementController.createClient);
router.post(STUDIO_MANAGEMENT_ROUTES.UPDATE_CLIENT, v.validate(UpdateStudioClientModel), studioManagementController.updateClient);
router.delete(STUDIO_MANAGEMENT_ROUTES.DELETE_CLIENT, studioManagementController.deleteClient);

//Add Speciality
router.post(SPECIALITY_ROUTES.CREATE_SPECIALITY, v.validate(CreateSpeciality), studioManagementController.addSpeciality);

//Get Speciality
router.get(SPECIALITY_ROUTES.GET_SPECIALITY, studioManagementController.getSpeciality);

//Edit Speciality
router.post(SPECIALITY_ROUTES.EDIT_SPECIALITY, v.validate(UpdateSpeciality), studioManagementMiddleware.isSpecialityNotExists, studioManagementController.editSpeciality);

//Delete Speciality
router.delete(SPECIALITY_ROUTES.DELETE_SPECIALITY, studioManagementMiddleware.isSpecialityNotExists, studioManagementController.deleteSpeciality);

router.get(TEMPLATES_ROUTES.GET_TEMPLATE, v.validate(GetTemplates), studioManagementController.getTemplates);

router.post(TEMPLATES_ROUTES.ADD_UPDATE_TEMPLATE, v.validate(CreateTemplate), studioManagementController.createTemplate);

router.post(QUESTIONNARIES_ROUTES.CREATE_QUESTIONNARIES, v.validate(CreateQuestionnaries), studioManagementController.createQuestionnaries);

router.get(QUESTIONNARIES_ROUTES.GET_QUESTIONNARIES, studioManagementController.getQuestionnaries);

router.get(QUESTIONNARIES_ROUTES.GET_CLIENT_QUESTIONNARIES, studioManagementController.getClientQuestionnaries);

router.delete(QUESTIONNARIES_ROUTES.DELETE_QUESTIONNARIES, studioManagementController.deleteQuestionnaries);

export const StudioManagementRouter: Router = router;