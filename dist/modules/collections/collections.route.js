"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionRoute = void 0;
var express_1 = require("express");
var routes_1 = require("../../config/routes");
var validator_1 = require("../../helpers/validator");
var collections_controller_1 = require("./collections.controller");
var collections_model_1 = require("./collections.model");
var router = (0, express_1.Router)();
var collectoinController = new collections_controller_1.CollectoinController();
var v = new validator_1.Validator();
router.post(routes_1.COLLECTION_ROUTES.CREATE_COLLECTION, v.validate(collections_model_1.CreateCollectionModel), collectoinController.createCollection);
router.post(routes_1.COLLECTION_ROUTES.UPLOAD_FILES, v.validate(collections_model_1.UploadFilesModel), collectoinController.filesUpload);
router.get(routes_1.COLLECTION_ROUTES.GET_COLLECTIONS, collectoinController.getCollections);
router.get(routes_1.COLLECTION_ROUTES.GET_COLLECTION_BY_ID, collectoinController.getCollectionByID);
router.get(routes_1.COLLECTION_ROUTES.GET_FILES, collectoinController.getCollectionFiles);
router.put(routes_1.COLLECTION_ROUTES.UPDATE_COLLECTION, v.validate(collections_model_1.UpdateCollectionModel), collectoinController.updateCollection);
router.delete(routes_1.COLLECTION_ROUTES.DELETE_COLLECTION, collectoinController.deleteCollection);
router.delete(routes_1.COLLECTION_ROUTES.DELETE_FILES, collectoinController.deleteFiles);
router.put(routes_1.COLLECTION_ROUTES.CHANGE_COVERPHOTO, collectoinController.changeCoverPhoto);
exports.CollectionRoute = router;
//# sourceMappingURL=collections.route.js.map