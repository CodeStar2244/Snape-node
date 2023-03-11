import { Router } from "express";
import { COLLECTION_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { CollectoinController } from "./collections.controller";
import { CreateCollectionModel } from "./collections.model";


const router: Router = Router(); 
const collectoinController = new CollectoinController();
const v :Validator = new Validator();

router.post(COLLECTION_ROUTES.CREATE_COLLECTION,v.validate(CreateCollectionModel),collectoinController.createCollection);
router.get(COLLECTION_ROUTES.GET_COLLECTIONS,collectoinController.getCollections);
export  const  CollectionRoute:Router = router;