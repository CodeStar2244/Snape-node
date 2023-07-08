import { Router } from "express";
import { STUDIO_MANAGEMENT_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { StudioManagementController } from "./studioManagement.controller";
import { CreateStudioClientModel } from "./studioManagement.model";


const router: Router = Router();
const studioManagementController = new StudioManagementController();
const v: Validator = new Validator();

router.get(STUDIO_MANAGEMENT_ROUTES.GET_CLIENTS, studioManagementController.getClient);
router.get(STUDIO_MANAGEMENT_ROUTES.GET_CLIENT, studioManagementController.getSingleClient);
router.post(STUDIO_MANAGEMENT_ROUTES.CREATE_CLIENT, v.validate(CreateStudioClientModel), studioManagementController.createClient);
router.delete(STUDIO_MANAGEMENT_ROUTES.DELETE_CLIENT, studioManagementController.deleteClient);
export const StudioManagementRouter: Router = router;