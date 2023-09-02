import { Router } from "express";
import { USER_ROUTES } from "../../config/routes";
import { UserController } from "./enterpriseclient.controller";
import { Middleware } from "../../middleware";
import { Validator } from "../../helpers/validator";
import { EnterpriseRegister, EnterpriseLogin } from "./enterpriseclient.model";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const userController: UserController = new UserController();

//Signup
router.post(
  USER_ROUTES.ENTERPRISE_REGISTER,
  v.validate(EnterpriseRegister),
  userController.enterpriseRegister,
);
router.post(
  USER_ROUTES.ENTERPRISE_LOGIN,
  v.validate(EnterpriseLogin),
  userController.enterpriseLogin,
);
router.get(
  USER_ROUTES.GET_REMANING_SPACE,
  new Middleware().authenticateEnterpriseUser,
  userController.getRemaningBalance,
);
export const EnterpriseClientRoutes: Router = router;
