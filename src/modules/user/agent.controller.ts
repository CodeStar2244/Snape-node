import { Request, Response } from "express";
import { AgentService } from "./agent.service";

export class UserController {
  private agentService: AgentService;
  constructor() {
    this.agentService = new AgentService();
  }
  public login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await this.agentService.login(email, password);
      return res.status(data.code).json(data);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public getRemaningBalance = async (req, res) => {
    try {
      const data = await this.agentService.getRemaningBalance(req.user);
      console.log("res sent");
      return res.status(data.code).json(data);
    } catch (error) {
      console.log("error");
      return res.status(error.code).json(error);
    }
  };
  public getAgentProfile = async (req, res) => {
    try {
      const data = await this.agentService.getAgentProfile(req.user);
      return res.status(data.code).json(data);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public updateAgentProfile = async (req, res) => {
    try {
      const data = await this.agentService.updateAgentProfile(
        req.user,
        req.body,
      );
      return res.status(data.code).json(data);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public getPlans = async (req, res) => {
    try {
      const data = await this.agentService.getPlans(req.user);
      return res.status(data.code).json(data);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
}
