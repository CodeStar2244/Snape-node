import { Request, Response } from "express";
import * as express from "express";
import { Middleware } from "./middleware";
import { ClientRoute } from "./modules/client/client.route";
import { AssetRegistryRouter } from "./modules/assetRegistry/assetRegistry.route";
import { EnterpriseCollectionRouter } from "./modules/enterpriseCollections/collections.route";
import { EnterpriseClientRoutes } from "./modules/enterpriseUser/enterpriseclient.route";
import { EnterpriseAssetRegistryRouter } from "./modules/enterpriseAssetRegistry/enterpriseAssetRegistry.route";
import { EnterpriseAgentsRouter } from "./modules/enterpriseAgents/enterpriseAgentsRoutes";
export class EnterpriseRoutes {
  private middleware = new Middleware();
  protected basePath: string;

  constructor(NODE_ENV: string) {
    switch (NODE_ENV) {
      case "production":
        this.basePath = "/app/dist";
        break;
      case "development":
        this.basePath = "/app/public";
        break;
    }
  }

  public defaultRoute(req: Request, res: Response) {
    res.json({
      message: "Hello Snape!",
    });
  }

  public path() {
    const router = express.Router();
    router.use("/client", EnterpriseClientRoutes);
    router.use(
      "/collection",
      this.middleware.authenticateEnterpriseUser,
      EnterpriseCollectionRouter,
    );
    router.use(
      "/asset",
      this.middleware.authenticateEnterpriseUser,
      EnterpriseAssetRegistryRouter,
    );
    router.use(
      "/agent",
      this.middleware.authenticateEnterpriseUser,
      EnterpriseAgentsRouter,
    );
    router.use("/client", ClientRoute);
    router.all("/*", (req: Request, res: Response) => {
      return res.status(404).json({
        message: "ERR_URL_NOT_FOUND",
      });
    });
    return router;
  }
}
