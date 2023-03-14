import { Router } from "express";
import { COLLECTION_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { CollectoinController } from "./collections.controller";
import { CreateCollectionModel, UpdateCollectionModel, UploadFilesModel } from "./collections.model";


const router: Router = Router(); 
const collectoinController = new CollectoinController();
const v :Validator = new Validator();

router.post(COLLECTION_ROUTES.CREATE_COLLECTION,v.validate(CreateCollectionModel),collectoinController.createCollection);
router.post(COLLECTION_ROUTES.UPLOAD_FILES,v.validate(UploadFilesModel),collectoinController.filesUpload);
router.get(COLLECTION_ROUTES.GET_COLLECTIONS,collectoinController.getCollections);
router.get(COLLECTION_ROUTES.GET_COLLECTION_BY_ID,collectoinController.getCollectionByID);
router.put(COLLECTION_ROUTES.UPDATE_COLLECTION,v.validate(UpdateCollectionModel),collectoinController.updateCollection);
export  const  CollectionRoute:Router = router;