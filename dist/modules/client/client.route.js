"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoute = void 0;
var express_1 = require("express");
var routes_1 = require("../../config/routes");
var validator_1 = require("../../helpers/validator");
var client_controller_1 = require("./client.controller");
var client_model_1 = require("./client.model");
var router = (0, express_1.Router)();
var clientController = new client_controller_1.ClientController();
var v = new validator_1.Validator();
router.post(routes_1.CLIENT_ROUTES.GET_COLLECTION_BY_ID_CLIENT, v.validate(client_model_1.CollectionDesignModel), clientController.getCollectionByUrl);
router.post(routes_1.CLIENT_ROUTES.DOWNLOAD_FILE, clientController.downloadFile);
router.post(routes_1.CLIENT_ROUTES.DOWNLOAD_COLLECTION, clientController.downloadCollection);
exports.ClientRoute = router;
//# sourceMappingURL=client.route.js.map