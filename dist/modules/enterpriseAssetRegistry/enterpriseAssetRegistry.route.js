"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetRegistryRouter = void 0;
var express_1 = require("express");
var routes_1 = require("../../config/routes");
var validator_1 = require("../../helpers/validator");
var enterPriseAssetRegistry_controller_1 = require("./enterPriseAssetRegistry.controller");
var enterpriseAssetRegistry_model_1 = require("./enterpriseAssetRegistry.model");
var router = (0, express_1.Router)();
var assetRegistryController = new enterPriseAssetRegistry_controller_1.EnterpriseAssetRegistryController();
var v = new validator_1.Validator();
router.post(routes_1.ASSET_REGISTRY_ROUTES.CREATE_ASSET, v.validate(enterpriseAssetRegistry_model_1.AssetCreateModel), assetRegistryController.createAsset);
router.get(routes_1.ASSET_REGISTRY_ROUTES.GET_ASSET, v.validate(enterpriseAssetRegistry_model_1.AssetGetModel), assetRegistryController.getAssets);
router.put(routes_1.ASSET_REGISTRY_ROUTES.UPDATE_ASSET, v.validate(enterpriseAssetRegistry_model_1.AssetUpdateModel), assetRegistryController.updateAsset);
router.get(routes_1.ASSET_REGISTRY_ROUTES.DASHBOARD, assetRegistryController.assetDashboard);
exports.AssetRegistryRouter = router;
//# sourceMappingURL=enterpriseAssetRegistry.route.js.map