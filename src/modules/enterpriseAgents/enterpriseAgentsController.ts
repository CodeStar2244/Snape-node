import { Request, Response } from "express";
import { EnterpriseAgentsService } from "./enterpriseAgentsService";
import { AgentFavourite } from "./enterpriseAgentsModel";

export class EnterpriseAgentsController {
  private enterpriseAgentsService = new EnterpriseAgentsService();
  public getAgentList = async (req: any, res: Response) => {
    try {
      const userDetails = req.user;
      const result = await this.enterpriseAgentsService.getAgents(
        req.query,
        userDetails,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public getFavouriteAgentList = async (req: any, res: Response) => {
    try {
      const userDetails = req.user;
      const result = await this.enterpriseAgentsService.getFavouriteAgentList(
        req.query,
        userDetails,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public bookAgentRequest = async (req: any, res: Response) => {
    try {
      const userDetails = req.user;
      const result = await this.enterpriseAgentsService.bookAgentRequest(
        req.body,
        req.params,
        userDetails,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public getAgentLocations = async (req: any, res: Response) => {
    try {
      const userDetails = req.user;
      const result = await this.enterpriseAgentsService.getAgentLocations(
        req.query,
        userDetails,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public getAgentDetails = async (req: any, res: Response) => {
    try {
      const userDetails = req.user;
      const result = await this.enterpriseAgentsService.getAgentDetails(
        req.params,
        userDetails,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public getAgentCategories = async (req: any, res: Response) => {
    try {
      const userDetails = req.user;
      const result = await this.enterpriseAgentsService.getAgentCategories(
        req.params,
        userDetails,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public getAgentPortfolio = async (req: any, res: Response) => {
    try {
      const userDetails = req.user;
      const result = await this.enterpriseAgentsService.getAgentPortfolio(
        req.params,
        userDetails,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public getAgenVideos = async (req: any, res: Response) => {
    try {
      const userDetails = req.user;
      const result = await this.enterpriseAgentsService.getAgenVideos(
        req.params,
        userDetails,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public getAgentReviews = async (req: any, res: Response) => {
    try {
      const userDetails = req.user;
      const result = await this.enterpriseAgentsService.getAgentReviews(
        req.params,
        userDetails,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public addRemoveFavourite = async (req: any, res: Response) => {
    try {
      const userDetails = req.user;
      const agentId = req.params.agentId;
      const queryParams = new AgentFavourite(req.body, req.query);
      const result = await this.enterpriseAgentsService.addRemoveFavourite(
        queryParams,
        userDetails,
        agentId,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      console.log("errror", error);
      return res.status(error.code).json(error);
    }
  };
}
