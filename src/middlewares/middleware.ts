import { isEmpty } from "lodash";
// import { TABLES } from "./config/tables";
import { Jwt } from "../helpers/jwt";
import { Log } from "../helpers/logger";
import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "..";

export class Middleware {
	private logger = new  Log();

	public authenticateUsers = async (req, res, next: () => void) => {
		const unAuthPayload = {
			error: {
				message: req.i18n.t("ERR_USER_NOT_VERIFIED"),
				code: 401,
				status: false,
			},
		};
		if (!isEmpty(req.headers.authorization)) {}
         else {
			unAuthPayload.error.message = req.i18n.t("ERR_UNAUTH");
			res.status(401).send(unAuthPayload.error);
			return;
		}
	};
}
