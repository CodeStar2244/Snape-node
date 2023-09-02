import { Router } from "express";
import { COLLECTION_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { EnterpriseCollectoinController } from "./collections.controller";
import {
  CollectionDesignModel,
  CollectionGetModel,
  CreateCollectionModel,
  UpdateCollectionModel,
  UploadFilesModel,
} from "./collections.model";

const router: Router = Router();
const collectoinController = new EnterpriseCollectoinController();
const v: Validator = new Validator();

router.post(
  COLLECTION_ROUTES.CREATE_COLLECTION,
  v.validate(CreateCollectionModel),
  collectoinController.createCollection,
);
router.post(
  COLLECTION_ROUTES.UPLOAD_FILES,
  v.validate(UploadFilesModel),
  collectoinController.filesUpload,
);
router.get(
  COLLECTION_ROUTES.GET_COLLECTIONS,
  v.validate(CollectionGetModel),
  collectoinController.getCollections,
);
router.get(
  COLLECTION_ROUTES.GET_COLLECTION_BY_ID,
  collectoinController.getCollectionByID,
);
router.get(
  COLLECTION_ROUTES.GET_FILES,
  collectoinController.getCollectionFiles,
);
router.get(
  COLLECTION_ROUTES.GET_FILES_NAME,
  collectoinController.getCollectionFilesName,
);
router.put(
  COLLECTION_ROUTES.UPDATE_COLLECTION,
  v.validate(UpdateCollectionModel),
  collectoinController.updateCollection,
);
router.delete(
  COLLECTION_ROUTES.DELETE_COLLECTION,
  collectoinController.deleteCollection,
);
router.delete(COLLECTION_ROUTES.DELETE_FILES, collectoinController.deleteFiles);
router.put(
  COLLECTION_ROUTES.CHANGE_COVERPHOTO,
  collectoinController.changeCoverPhoto,
);
router.put(
  COLLECTION_ROUTES.COLLECTION_DESIGN,
  v.validate(CollectionDesignModel),
  collectoinController.collectionDesign,
);
router.get(
  COLLECTION_ROUTES.COLLECTION_DESIGN,
  collectoinController.getCollectionDesign,
);
router.get(COLLECTION_ROUTES.LIST_THEMES, collectoinController.listThemes);
export const EnterpriseCollectionRouter: Router = router;
