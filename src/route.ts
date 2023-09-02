import { Request, Response } from "express";
import * as express from "express";
import { UserRoute } from "./modules/user/agent.route";
import { Middleware } from "./middleware";
import { CollectionRoute } from "./modules/collections/collections.route";
import { DashboardRoute } from "./modules/dashboard/dashboard.routes";
import { ClientRoute } from "./modules/client/client.route";
import { AssetRegistryRouter } from "./modules/assetRegistry/assetRegistry.route";
import { EnterpriseCollectionRouter } from "./modules/enterpriseCollections/collections.route";
import { StudioManagementRouter } from "./modules/studioManagement/studioManagement.routes";
import { PortfolioRoute } from "./modules/agentPortfolio/portfolio.route";
export class Routes {
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
    router.use("/agent", UserRoute);
    router.use(
      "/collection",
      this.middleware.authenticateUser,
      CollectionRoute,
    );
    router.use("/dashboard", this.middleware.authenticateUser, DashboardRoute);
    router.use("/portfolio", this.middleware.authenticateUser, PortfolioRoute);
    router.use("/asset", this.middleware.authenticateUser, AssetRegistryRouter);
    router.use(
      "/studiomanagement",
      this.middleware.authenticateUser,
      StudioManagementRouter,
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
