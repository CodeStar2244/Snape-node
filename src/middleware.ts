import { isEmpty } from "lodash";
// import { TABLES } from "./config/tables";
import { Jwt } from "./helpers/jwt";
import { Log } from "./helpers/logger";
import { Tblagent } from "./entities/Tblagent";
import { AppDataSource } from "./db/db.config";
import { EnterPriseClient } from "./entities/enterPriseClient";

export class Middleware {
  private logger = new Log();

  public authenticateUser = async (req, res, next: () => void) => {
    try {
      const unAuthPayload = {
        error: {
          message: req.i18n.t("ERR_USER_NOT_VERIFIED"),
          code: 401,
          status: false,
        },
      };
      if (!isEmpty(req.headers.authorization)) {
        const token = req.headers.authorization;
        const tokenInfo = Jwt.decodeAuthToken(token).payload;
        const agentRepo = AppDataSource.getRepository(Tblagent);

        const agent = await agentRepo.findOneBy({
          id: tokenInfo.agentId,
        });

        if (!agent) {
          unAuthPayload.error.message = req.i18n.t("USER_NOT_EXIST");
          unAuthPayload.error.code = 404;
          return res.status(unAuthPayload.error.code).send(unAuthPayload.error);
        }
        if (!agent.isactive) {
          unAuthPayload.error.message = req.i18n.t("ERR_ACCESS_REMOVED");
          unAuthPayload.error.code = 401;
          return res.status(unAuthPayload.error.code).send(unAuthPayload.error);
        }
        const userObj = {
          email: agent.email,
          id: agent.id,
          firstName: agent.firstname,
          lastName: agent.lastname,
        };
        req.user = userObj;
        next();
      } else {
        unAuthPayload.error.message = req.i18n.t("ERR_UNAUTH");
        res.status(401).send(unAuthPayload.error);
        return;
      }
    } catch (error) {
      const unAuthPayload = {
        error: {
          message: req.i18n.t("ERR_UNAUTH"),
          code: 401,
          status: false,
        },
      };
      if (error.name === "TokenExpiredError") {
        return res.status(401).send(unAuthPayload.error);
      } else {
        console.log(error);
        unAuthPayload.error.message = req.i18n.t("ERR_INVALID_TOKEN");
        return res.status(401).send(unAuthPayload.error);
      }
    }
  };

  public authenticateEnterpriseUser = async (req, res, next: () => void) => {
    try {
      const unAuthPayload = {
        error: {
          message: req.i18n.t("ERR_USER_NOT_VERIFIED"),
          code: 401,
          status: false,
        },
      };
      if (!isEmpty(req.headers.authorization)) {
        const token = req.headers.authorization;
        const tokenInfo = Jwt.decodeAuthToken(token).payload;
        const enterpriseRepo = AppDataSource.getRepository(EnterPriseClient);
        const enterpriseUser = await enterpriseRepo.findOneBy({
          id: tokenInfo.clientId,
        });
        if (!enterpriseUser) {
          unAuthPayload.error.message = req.i18n.t("USER_NOT_EXIST");
          unAuthPayload.error.code = 404;
          return res.status(unAuthPayload.error.code).send(unAuthPayload.error);
        }
        if (!enterpriseUser.isactive) {
          unAuthPayload.error.message = req.i18n.t("ERR_ACCESS_REMOVED");
          unAuthPayload.error.code = 401;
          return res.status(unAuthPayload.error.code).send(unAuthPayload.error);
        }
        const userObj = {
          email: enterpriseUser.email,
          id: enterpriseUser.id,
          name: enterpriseUser.name,
        };
        req.user = userObj;
        next();
      } else {
        unAuthPayload.error.message = req.i18n.t("ERR_UNAUTH");
        res.status(401).send(unAuthPayload.error);
        return;
      }
    } catch (error) {
      const unAuthPayload = {
        error: {
          message: req.i18n.t("ERR_UNAUTH"),
          code: 401,
          status: false,
        },
      };
      if (error.name === "TokenExpiredError") {
        return res.status(401).send(unAuthPayload.error);
      } else {
        console.log(error);
        unAuthPayload.error.message = req.i18n.t("ERR_INVALID_TOKEN");
        return res.status(401).send(unAuthPayload.error);
      }
    }
  };
}
