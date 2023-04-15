import { Router } from "express";
import { ASSET_REGISTRY_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { AssetRegistryController } from "./assetRegistry.controller";
import { AssetCreateModel, AssetGetModel } from "./assetRegistry.model";


const router: Router = Router(); 
const assetRegistryController = new AssetRegistryController();
const v :Validator = new Validator();

router.post(ASSET_REGISTRY_ROUTES.CREATE_ASSET,v.validate(AssetCreateModel),assetRegistryController.createAsset);
router.get(ASSET_REGISTRY_ROUTES.GET_ASSET,v.validate(AssetGetModel),assetRegistryController.getAssets);

export  const  AssetRegistryRouter:Router = router;