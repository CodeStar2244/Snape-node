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
exports.Routes = void 0;
var express = __importStar(require("express"));
var agent_route_1 = require("./modules/user/agent.route");
var middleware_1 = require("./middleware");
var collections_route_1 = require("./modules/collections/collections.route");
var dashboard_routes_1 = require("./modules/dashboard/dashboard.routes");
var client_route_1 = require("./modules/client/client.route");
var assetRegistry_route_1 = require("./modules/assetRegistry/assetRegistry.route");
var collections_route_2 = require("./modules/enterpriseCollections/collections.route");
var Routes = /** @class */ (function () {
    function Routes(NODE_ENV) {
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
    Routes.prototype.defaultRoute = function (req, res) {
        res.json({
            message: "Hello Snape!",
        });
    };
    Routes.prototype.path = function () {
        var router = express.Router();
        router.use("/agent", agent_route_1.UserRoute);
        router.use("/collection", this.middleware.authenticateUser, collections_route_1.CollectionRoute);
        router.use("/dashboard", this.middleware.authenticateUser, dashboard_routes_1.DashboardRoute);
        router.use("/asset", this.middleware.authenticateUser, assetRegistry_route_1.AssetRegistryRouter);
        router.use("/client", client_route_1.ClientRoute);
        router.use("/enterprise/collection", this.middleware.authenticateUser, collections_route_2.EnterpriseCollectionRouter);
        router.all("/*", function (req, res) {
            return res.status(404).json({
                message: "ERR_URL_NOT_FOUND",
            });
        });
        return router;
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=route.js.map