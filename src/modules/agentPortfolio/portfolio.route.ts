import { Router } from "express";
import { PORTFOLIO_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { PortfolioController } from "./portfolio.controller";
import {
  PortfolioGetModel,
  UpdatePortfolioModel,
  UploadFilesModel,
} from "./portfolio.model";

const router: Router = Router();
const portfolioController = new PortfolioController();
const v: Validator = new Validator();

router.post(
  PORTFOLIO_ROUTES.CREATE_COLLECTION,
  portfolioController.createPortfolio,
);
router.post(
  PORTFOLIO_ROUTES.UPLOAD_FILES,
  v.validate(UploadFilesModel),
  portfolioController.filesUpload,
);
router.get(
  PORTFOLIO_ROUTES.GET_COLLECTIONS,
  v.validate(PortfolioGetModel),
  portfolioController.getPortfolios,
);
router.get(
  PORTFOLIO_ROUTES.GET_COLLECTION_BY_ID,
  portfolioController.getPortfolioByID,
);
router.get(PORTFOLIO_ROUTES.GET_FILES, portfolioController.getPortfolioFiles);
router.get(
  PORTFOLIO_ROUTES.GET_FILES_NAME,
  portfolioController.getPortfolioFilesName,
);
router.delete(
  PORTFOLIO_ROUTES.DELETE_COLLECTION,
  portfolioController.deletePortfolio,
);
router.delete(PORTFOLIO_ROUTES.DELETE_FILES, portfolioController.deleteFiles);
router.put(
  PORTFOLIO_ROUTES.CHANGE_COVERPHOTO,
  portfolioController.changeCoverPhoto,
);
router.post(
  PORTFOLIO_ROUTES.ADD_VIDEO_LINK,
  v.validate(PortfolioGetModel),
  portfolioController.changeCoverPhoto,
);

export const PortfolioRoute: Router = router;
