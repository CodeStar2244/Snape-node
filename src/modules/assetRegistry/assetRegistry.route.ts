import { Router } from "express";
import { ASSET_REGISTRY_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { AssetRegistryController } from "./assetRegistry.controller";
import { AssetCreateModel } from "./assetRegistry.model";


const router: Router = Router(); 
const assetRegistryController = new AssetRegistryController();
const v :Validator = new Validator();

router.post(ASSET_REGISTRY_ROUTES.CREATE_ASSET,v.validate(AssetCreateModel),assetRegistryController.createAsset);

export  const  AssetRegistryRouter:Router = router;