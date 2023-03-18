import { Router } from "express";
import { COLLECTION_ROUTES, DASHBOARD_ROTUES } from "../../config/routes";
import { DashboardController } from "./dashboard.controller";


const router: Router = Router(); 
const collectoinController = new DashboardController();

router.get(DASHBOARD_ROTUES.GET_SUMMARY,collectoinController.getSummary);
export  const  DashboardRoute:Router = router;