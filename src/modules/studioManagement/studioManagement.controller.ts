import { Request } from "express";
import { StudioManagementService } from "./studioManagement.service";

export class StudioManagementController {
  private clientService = new StudioManagementService()
  public createClient = async (req, res) => {
    try {
      const userDetails = req.user;
      const result = await this.clientService.createClient(userDetails, req.body);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  }
  public getClient = async (req, res) => {
    try {
      const userDetails = req.user;
      const { search } = req.query;
      const result = await this.clientService.getClient(userDetails, search);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  }
  public getSingleClient = async (req, res) => {
    try {
      const userDetails = req.user;
      const { id } = req.params;
      const result = await this.clientService.getClientDetails(userDetails, id);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  }
  public updateClient = async (req, res) => {
    try {
      const userDetails = req.user;
      const { id } = req.params;
      const result = await this.clientService.editClient(req.params, req.body, userDetails);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  }
  public deleteClient = async (req, res) => {
    try {
      const userDetails = req.user;
      const { id } = req.params;
      const result = await this.clientService.deleteClient(userDetails, id);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  }


  addSpeciality = async (req: any, res: any) => {
    try {
      const params = req.body;
      const user = req.user;
      const result = await this.clientService.addSpeciality(params, user);

      res.status(result.code).json(result?.result || result?.error);
    } catch (error) {
      res
        .status(500)
        .json({ code: 500, message: "INTERNAL_SERVER_ERROR" });
    }
  };

  //Profile
  getSpeciality = async (req: any, res: any) => {
    try {
      const result = await this.clientService.getSpeciality(req.user);
      res.status(result.code).json(result?.result || result?.error);
    } catch (error) {
      res
        .status(500)
        .json({ code: 500, message: "INTERNAL_SERVER_ERROR" });
    }
  };

  editSpeciality = async (req: Request, res: any) => {
    try {
      const result = await this.clientService.editSpeciality(
        req.params,
        req.body
      );
      res.status(result.code).json(result?.result || result?.error);
    } catch (error) {
      res
        .status(500)
        .json({ code: 500, message: "INTERNAL_SERVER_ERROR" });
    }
  };

  deleteSpeciality = async (req: Request, res: any) => {
    try {
      const result = await this.clientService.deleteSpeciality(
        req.params
      );
      res.status(result.code).json(result?.result || result?.error);
    } catch (error) {
      res
        .status(500)
        .json({ code: 500, message: "INTERNAL_SERVER_ERROR" });
    }
  };

  public getTemplates = async (req, res) => {
    try {
      const userDetails = req.user;
      const { type } = req.query;
      const result = await this.clientService.getTemplates(userDetails, type);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  }

  public createTemplate = async (req, res) => {
    try {
      const userDetails = req.user;
      const params = req.body;
      const result = await this.clientService.createTemplates(userDetails, params);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  }

  public createQuestionnaries = async (req, res) => {
    try {
      const userDetails = req.user;
      const params = req.body;
      const result = await this.clientService.createQuestionnaries(userDetails, params);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  }

  public getQuestionnaries = async (req, res) => {
    try {
      const userDetails = req.user;
      const result = await this.clientService.getQuestionnaries(userDetails);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  }

  public getClientQuestionnaries = async (req, res) => {
    try {
      const userDetails = req.user;
      const { id } = req.params
      const result = await this.clientService.getClientQuestionnaries(userDetails, id);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  }

  public deleteQuestionnaries = async (req, res) => {
    try {
      const userDetails = req.user;
      const { id } = req.params
      const result = await this.clientService.deleteQuestionnaries(userDetails, id);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  }


}