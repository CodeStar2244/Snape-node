import { Router } from "express";
import {
  STUDIO_MANAGEMENT_ROUTES,
  SPECIALITY_ROUTES,
  TEMPLATES_ROUTES,
  QUESTIONNARIES_ROUTES,
  INVOICE_ROUTES,
  QUOTATION_ROUTES,
  BOOKING_ROUTES,
} from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { StudioManagementController } from "./studioManagement.controller";
import {
  CreateStudioClientModel,
  CreateSpeciality,
  GetSpeciality,
  UpdateSpeciality,
  UpdateStudioClientModel,
  GetTemplates,
  CreateTemplate,
  CreateQuestionnaries,
  CreateInvoice,
  CreateQuotation,
  CreateBooking,
} from "./studioManagement.model";
import { StudioManagementMiddleware } from "./studioManagement.middleware";

const router: Router = Router();
const studioManagementController = new StudioManagementController();
const studioManagementMiddleware = new StudioManagementMiddleware();
const v: Validator = new Validator();

router.get(
  STUDIO_MANAGEMENT_ROUTES.GET_CLIENTS,
  studioManagementController.getClient,
);
router.get(
  STUDIO_MANAGEMENT_ROUTES.GET_CLIENT,
  studioManagementController.getSingleClient,
);
router.post(
  STUDIO_MANAGEMENT_ROUTES.CREATE_CLIENT,
  v.validate(CreateStudioClientModel),
  studioManagementController.createClient,
);
router.post(
  STUDIO_MANAGEMENT_ROUTES.UPDATE_CLIENT,
  v.validate(UpdateStudioClientModel),
  studioManagementController.updateClient,
);
router.delete(
  STUDIO_MANAGEMENT_ROUTES.DELETE_CLIENT,
  studioManagementController.deleteClient,
);

//Add Speciality
router.post(
  SPECIALITY_ROUTES.CREATE_SPECIALITY,
  v.validate(CreateSpeciality),
  studioManagementController.addSpeciality,
);

//Get Speciality
router.get(
  SPECIALITY_ROUTES.GET_SPECIALITY,
  studioManagementController.getSpeciality,
);

//Edit Speciality
router.post(
  SPECIALITY_ROUTES.EDIT_SPECIALITY,
  v.validate(UpdateSpeciality),
  studioManagementMiddleware.isSpecialityNotExists,
  studioManagementController.editSpeciality,
);

//Delete Speciality
router.delete(
  SPECIALITY_ROUTES.DELETE_SPECIALITY,
  studioManagementMiddleware.isSpecialityNotExists,
  studioManagementController.deleteSpeciality,
);

router.get(
  TEMPLATES_ROUTES.GET_TEMPLATE,
  v.validate(GetTemplates),
  studioManagementController.getTemplates,
);

router.post(
  TEMPLATES_ROUTES.ADD_UPDATE_TEMPLATE,
  v.validate(CreateTemplate),
  studioManagementController.createTemplate,
);

router.post(
  QUESTIONNARIES_ROUTES.CREATE_QUESTIONNARIES,
  v.validate(CreateQuestionnaries),
  studioManagementController.createQuestionnaries,
);

router.get(
  QUESTIONNARIES_ROUTES.GET_QUESTIONNARIES,
  studioManagementController.getQuestionnaries,
);

router.get(
  QUESTIONNARIES_ROUTES.GET_CLIENT_QUESTIONNARIES,
  studioManagementController.getClientQuestionnaries,
);

router.delete(
  QUESTIONNARIES_ROUTES.DELETE_QUESTIONNARIES,
  studioManagementController.deleteQuestionnaries,
);

router.post(
  INVOICE_ROUTES.CREATE_INVOICE,
  studioManagementController.createInvoice,
);

router.get(
  INVOICE_ROUTES.INVOICE_SUMMARY,
  studioManagementController.getInvoiceSummary,
);

router.get(INVOICE_ROUTES.GET_INVOICES, studioManagementController.getInvoices);

router.get(INVOICE_ROUTES.GET_INVOICE, studioManagementController.getInvoice);

router.post(
  INVOICE_ROUTES.UPDATE_INVOICE,
  studioManagementController.editInvoice,
);

router.delete(
  INVOICE_ROUTES.DELETE_INVOICE,
  studioManagementController.deleteInvoice,
);

router.post(
  QUOTATION_ROUTES.CREATE_QUOTATION,
  studioManagementController.createQuotation,
);

router.get(
  QUOTATION_ROUTES.GET_QUOTATIONS,
  studioManagementController.getQuotations,
);

router.get(
  QUOTATION_ROUTES.GET_QUOTATION,
  studioManagementController.getQuotation,
);

router.post(
  QUOTATION_ROUTES.UPDATE_QUOTATION,
  studioManagementController.editQuotation,
);

router.delete(
  QUOTATION_ROUTES.DELETE_QUOTATION,
  studioManagementController.deleteQuotation,
);

router.post(
  BOOKING_ROUTES.CREATE_BOOKING,
  v.validate(CreateBooking),
  studioManagementController.createBooking,
);

router.get(BOOKING_ROUTES.GET_BOOKINGS, studioManagementController.getBookings);

router.get(BOOKING_ROUTES.GET_BOOKING, studioManagementController.getBooking);

router.post(
  BOOKING_ROUTES.UPDATE_BOOKING,
  studioManagementController.editBooking,
);

router.delete(
  BOOKING_ROUTES.DELETE_BOOKING,
  studioManagementController.deleteBooking,
);

router.get(
  STUDIO_MANAGEMENT_ROUTES.DASHBOARD,
  studioManagementController.getStudioDashboard,
);

export const StudioManagementRouter: Router = router;
