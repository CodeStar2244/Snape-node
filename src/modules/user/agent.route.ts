import { Router } from "express";
import { USER_ROUTES } from "../../config/routes";
import { UserController } from "./agent.controller";
import { Middleware } from "../../middleware";
import { Validator } from "../../helpers/validator";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const userController: UserController = new UserController();

//Signup
router.post(USER_ROUTES.LOGIN, userController.login);
router.get(
  USER_ROUTES.GET_REMANING_SPACE,
  new Middleware().authenticateUser,
  userController.getRemaningBalance,
);
router.get(
  USER_ROUTES.GET_PROFILE,
  new Middleware().authenticateUser,
  userController.getAgentProfile,
);
router.post(
  USER_ROUTES.GET_PROFILE,
  new Middleware().authenticateUser,
  userController.updateAgentProfile,
);
router.get(
  USER_ROUTES.GET_PLANS,
  new Middleware().authenticateUser,
  userController.getPlans,
);
export const UserRoute: Router = router;
