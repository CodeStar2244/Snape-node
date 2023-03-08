import { Router } from "express";
import { USER_ROUTES } from "../../config/routes";
import { UserController } from "./agent.controller";


// Assign router to the express.Router() instance
const router: Router = Router();
const userController:UserController = new UserController()


//Signup
router.post(USER_ROUTES.LOGIN , userController.login );

 export const UserRoute: Router = router;
