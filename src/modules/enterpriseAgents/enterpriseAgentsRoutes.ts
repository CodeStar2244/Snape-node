import { Router } from "express";
import { AGENT_SERVICE, ASSET_REGISTRY_ROUTES } from "../../config/routes";
import { Validator } from "../../helpers/validator";
import { EnterpriseAgentsController } from "./enterpriseAgentsController";
import { AgentFavourite, AgentGetList } from "./enterpriseAgentsModel";

const router: Router = Router(); 
const enterpriseAgentsController = new EnterpriseAgentsController();
const v :Validator = new Validator();

router.get(AGENT_SERVICE.LIST_AGENTS,v.validate(AgentGetList),enterpriseAgentsController.getAgentList);
router.get(AGENT_SERVICE.LIST_AGENTS_LOCATIONS,v.validate(AgentGetList),enterpriseAgentsController.getAgentLocations);
router.get(AGENT_SERVICE.GET_AGENT_DETAILS ,enterpriseAgentsController.getAgentDetails);
router.get(AGENT_SERVICE.GET_AGENT_CATEGORIES ,enterpriseAgentsController.getAgentCategories);
router.get(AGENT_SERVICE.GET_AGENT_REVIEWS ,enterpriseAgentsController.getAgentReviews);
router.get(AGENT_SERVICE.FAVOURITE ,v.validate(AgentFavourite),enterpriseAgentsController.addRemoveFavourite);
router.get(AGENT_SERVICE.LIST_FAVOURITES ,enterpriseAgentsController.getFavouriteAgentList);


export  const  EnterpriseAgentsRouter:Router = router;