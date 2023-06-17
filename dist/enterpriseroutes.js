"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseRoutes = void 0;
var express = __importStar(require("express"));
var middleware_1 = require("./middleware");
var client_route_1 = require("./modules/client/client.route");
var assetRegistry_route_1 = require("./modules/assetRegistry/assetRegistry.route");
var collections_route_1 = require("./modules/enterpriseCollections/collections.route");
var enterpriseclient_route_1 = require("./modules/enterpriseUser/enterpriseclient.route");
var EnterpriseRoutes = /** @class */ (function () {
    function EnterpriseRoutes(NODE_ENV) {
        this.middleware = new middleware_1.Middleware();
        switch (NODE_ENV) {
            case "production":
                this.basePath = "/app/dist";
                break;
            case "development":
                this.basePath = "/app/public";
                break;
        }
    }
    EnterpriseRoutes.prototype.defaultRoute = function (req, res) {
        res.json({
            message: "Hello Snape!",
        });
    };
    EnterpriseRoutes.prototype.path = function () {
        var router = express.Router();
        router.use("/client", enterpriseclient_route_1.EnterpriseClientRoutes);
        router.use("/collection", this.middleware.authenticateEnterpriseUser, collections_route_1.EnterpriseCollectionRouter);
        router.use("/asset", this.middleware.authenticateEnterpriseUser, assetRegistry_route_1.AssetRegistryRouter);
        router.use("/client", client_route_1.ClientRoute);
        router.all("/*", function (req, res) {
            return res.status(404).json({
                message: "ERR_URL_NOT_FOUND",
            });
        });
        return router;
    };
    return EnterpriseRoutes;
}());
exports.EnterpriseRoutes = EnterpriseRoutes;
//# sourceMappingURL=enterpriseroutes.js.map