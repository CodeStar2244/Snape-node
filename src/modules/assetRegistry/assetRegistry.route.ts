import { Router } from "express";
import { ASSET_REGISTRY_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { AssetRegistryController } from "./assetRegistry.controller";
import {
  AssetCreateModel,
  AssetGetModel,
  AssetUpdateModel,
} from "./assetRegistry.model";

const router: Router = Router();
const assetRegistryController = new AssetRegistryController();
const v: Validator = new Validator();

router.post(
  ASSET_REGISTRY_ROUTES.CREATE_ASSET,
  v.validate(AssetCreateModel),
  assetRegistryController.createAsset,
);
router.get(
  ASSET_REGISTRY_ROUTES.GET_ASSET,
  v.validate(AssetGetModel),
  assetRegistryController.getAssets,
);
router.put(
  ASSET_REGISTRY_ROUTES.UPDATE_ASSET,
  v.validate(AssetUpdateModel),
  assetRegistryController.updateAsset,
);
router.get(
  ASSET_REGISTRY_ROUTES.DASHBOARD,
  assetRegistryController.assetDashboard,
);

export const AssetRegistryRouter: Router = router;
