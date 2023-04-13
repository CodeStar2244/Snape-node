"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetRegistryRouter = void 0;
var express_1 = require("express");
var routes_1 = require("../../config/routes");
var validator_1 = require("../../helpers/validator");
var assetRegistry_controller_1 = require("./assetRegistry.controller");
var assetRegistry_model_1 = require("./assetRegistry.model");
var router = (0, express_1.Router)();
var assetRegistryController = new assetRegistry_controller_1.AssetRegistryController();
var v = new validator_1.Validator();
router.post(routes_1.ASSET_REGISTRY_ROUTES.CREATE_ASSET, v.validate(assetRegistry_model_1.AssetCreateModel), assetRegistryController.createAsset);
exports.AssetRegistryRouter = router;
//# sourceMappingURL=assetRegistry.route.js.map