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
}