import { Router } from "express";
import { CLIENT_ROUTES, COLLECTION_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { ClientController } from "./client.controller";
import {CollectionDesignModel} from "./client.model";


const router: Router = Router(); 
const clientController = new ClientController();
const v :Validator = new Validator();

router.post(CLIENT_ROUTES.GET_COLLECTION_BY_ID_CLIENT,v.validate(CollectionDesignModel),clientController.getCollectionByUrl);
router.post(CLIENT_ROUTES.DOWNLOAD_FILE,clientController.downloadFile);
router.post(CLIENT_ROUTES.DOWNLOAD_COLLECTION,clientController.downloadCollection);
router.post(CLIENT_ROUTES.PIN_CHECK,clientController.downloadPinCheck);
router.post(CLIENT_ROUTES.FILE_PIN_CHECK,clientController.downloadFilePinCheck);
router.get(CLIENT_ROUTES.GET_CLIENT_QUESTIONNARIES,clientController.getClientQuestionnaries);
router.post(CLIENT_ROUTES.SUBMIT_CLIENT_QUESTIONNARIES,clientController.submitClientQuestionnaries);

export  const  ClientRoute:Router = router;