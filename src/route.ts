import { Request, Response } from "express";
import * as express from "express";
import { UserRoute } from "./modules/user/agent.route";
export class Routes {
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

    router.all("/*", (req: Request, res: Response) => {
      return res.status(404).json({
        message: "ERR_URL_NOT_FOUND",
      });
    });
    return router;
  }
}
