import { Request, Response } from "express";
import { PortfolioService } from "./portfolio.service";

export class PortfolioController {
  private portfolioService = new PortfolioService();
  public createPortfolio = async (req, res) => {
    try {
      const result = await this.portfolioService.createPortfolio(
        req.body,
        req.user,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public getPortfolios = async (req: any, res) => {
    try {
      const { search, order, sort } = req.query;
      const result = await this.portfolioService.getPortfolios(
        req.user,
        search,
        order,
        sort,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public getPortfolioByID = async (req, res) => {
    try {
      const result = await this.portfolioService.getPortfolioByID(
        req.user,
        req.params.id,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public getPortfolioFiles = async (req, res) => {
    try {
      const { search, sort, order } = req.query;
      const result = await this.portfolioService.getPortfolioFiles(
        req.user,
        req.params.id,
        search,
        sort,
        order,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public getPortfolioFilesName = async (req, res) => {
    try {
      const result = await this.portfolioService.getPortfolioFilesName(
        req.user,
        req.params.id,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };

  public changeCoverPhoto = async (req, res) => {
    try {
      const result = await this.portfolioService.changeCoverPhoto(
        req.params,
        req.body,
        req.user,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public deletePortfolio = async (req, res) => {
    try {
      const result = await this.portfolioService.deletePortfolio(
        req.user,
        req.params.id,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public deleteFiles = async (req, res) => {
    try {
      const { ids } = req.body;
      const result = await this.portfolioService.deleteFiles(
        req.user,
        req.params.id,
        ids,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
  public filesUpload = async (req, res) => {
    try {
      const result = await this.portfolioService.uploadFiles(
        req.params,
        req.body,
        req.user,
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
}
