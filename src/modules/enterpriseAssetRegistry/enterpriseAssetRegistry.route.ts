import { Router } from "express";
import { ASSET_REGISTRY_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { EnterpriseAssetRegistryController } from "./enterPriseAssetRegistry.controller";
import { AssetCreateModel, AssetGetModel, AssetUpdateModel } from "./enterpriseAssetRegistry.model";


const router: Router = Router(); 
const assetRegistryController = new EnterpriseAssetRegistryController();
const v :Validator = new Validator();

router.post(ASSET_REGISTRY_ROUTES.CREATE_ASSET,v.validate(AssetCreateModel),assetRegistryController.createAsset);
router.get(ASSET_REGISTRY_ROUTES.GET_ASSET,v.validate(AssetGetModel),assetRegistryController.getAssets);
router.put(ASSET_REGISTRY_ROUTES.UPDATE_ASSET,v.validate(AssetUpdateModel),assetRegistryController.updateAsset);
router.get(ASSET_REGISTRY_ROUTES.DASHBOARD,assetRegistryController.assetDashboard);

export  const  EnterpriseAssetRegistryRouter:Router = router;