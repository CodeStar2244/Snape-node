import { Request } from "express";
import { StudioManagementService } from "./studioManagement.service";

export class StudioManagementController {
    private clientService = new StudioManagementService();
    public createClient = async (req, res) => {
        try {
            const userDetails = req.user;
            const result = await this.clientService.createClient(
                userDetails,
                req.body
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };
    public getClient = async (req, res) => {
        try {
            const userDetails = req.user;
            const { search } = req.query;
            const result = await this.clientService.getClient(
                userDetails,
                search
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };
    public getSingleClient = async (req, res) => {
        try {
            const userDetails = req.user;
            const { id } = req.params;
            const result = await this.clientService.getClientDetails(
                userDetails,
                id
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };
    public updateClient = async (req, res) => {
        try {
            const userDetails = req.user;
            const { id } = req.params;
            const result = await this.clientService.editClient(
                req.params,
                req.body,
                userDetails
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };
    public deleteClient = async (req, res) => {
        try {
            const userDetails = req.user;
            const { id } = req.params;
            const result = await this.clientService.deleteClient(
                userDetails,
                id
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    addSpeciality = async (req: any, res: any) => {
        try {
            const params = req.body;
            const user = req.user;
            const result = await this.clientService.addSpeciality(params, user);

            res.status(result.code).json(result?.result || result?.error);
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: "INTERNAL_SERVER_ERROR",
            });
        }
    };

    //Profile
    getSpeciality = async (req: any, res: any) => {
        try {
            const result = await this.clientService.getSpeciality(req.user);
            res.status(result.code).json(result?.result || result?.error);
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: "INTERNAL_SERVER_ERROR",
            });
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
            res.status(500).json({
                code: 500,
                message: "INTERNAL_SERVER_ERROR",
            });
        }
    };

    deleteSpeciality = async (req: Request, res: any) => {
        try {
            const result = await this.clientService.deleteSpeciality(
                req.params
            );
            res.status(result.code).json(result?.result || result?.error);
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: "INTERNAL_SERVER_ERROR",
            });
        }
    };

    public getTemplates = async (req, res) => {
        try {
            const userDetails = req.user;
            const { type } = req.query;
            const result = await this.clientService.getTemplates(
                userDetails,
                type
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public createTemplate = async (req, res) => {
        try {
            const userDetails = req.user;
            const params = req.body;
            const result = await this.clientService.createTemplates(
                userDetails,
                params
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public createQuestionnaries = async (req, res) => {
        try {
            const userDetails = req.user;
            const params = req.body;
            const result = await this.clientService.createQuestionnaries(
                userDetails,
                params
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public createInvoice = async (req, res) => {
        try {
            const userDetails = req.user;
            const params = req.body;
            const result = await this.clientService.createInvoice(
                userDetails,
                params
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public getInvoices = async (req, res) => {
        try {
            const userDetails = req.user;
            const result = await this.clientService.getInvoices(userDetails);
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public getInvoice = async (req, res) => {
        try {
            const userDetails = req.user;
            const { id } = req.params;
            const result = await this.clientService.getInvoice(userDetails, id);
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    editInvoice = async (req: any, res: any) => {
        try {
            const userDetails = req.user;

            const result = await this.clientService.editInvoice(
                req.params,
                req.body,
                userDetails
            );
            res.status(result.code).json(result?.result || result?.error);
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: "INTERNAL_SERVER_ERROR",
            });
        }
    };

    public deleteInvoice = async (req, res) => {
        try {
            const userDetails = req.user;
            const { id } = req.params;
            const result = await this.clientService.deleteInvoice(
                userDetails,
                id
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public createQuotation = async (req, res) => {
        try {
            const userDetails = req.user;
            const params = req.body;
            const result = await this.clientService.createQuotation(
                userDetails,
                params
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public getQuotations = async (req, res) => {
        try {
            const userDetails = req.user;
            const result = await this.clientService.getQuotations(userDetails);
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public getQuotation = async (req, res) => {
        try {
            const userDetails = req.user;
            const { id } = req.params;
            const result = await this.clientService.getQuotation(
                userDetails,
                id
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public editQuotation = async (req: any, res: any) => {
        try {
            const userDetails = req.user;

            const result = await this.clientService.editQuotation(
                req.params,
                req.body,
                userDetails
            );
            res.status(result.code).json(result?.result || result?.error);
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: "INTERNAL_SERVER_ERROR",
            });
        }
    };

    public deleteQuotation = async (req, res) => {
        try {
            const userDetails = req.user;
            const { id } = req.params;
            const result = await this.clientService.deleteQuotation(
                userDetails,
                id
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public createBooking = async (req, res) => {
        try {
            const userDetails = req.user;
            const params = req.body;
            const result = await this.clientService.createBooking(
                userDetails,
                params
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public getBookings = async (req, res) => {
        try {
            const userDetails = req.user;
            const result = await this.clientService.getBookings(userDetails);
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public getBooking = async (req, res) => {
        try {
            const userDetails = req.user;
            const { id } = req.params;
            const result = await this.clientService.getBooking(userDetails, id);
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public editBooking = async (req: Request, res: any) => {
        try {
            const result = await this.clientService.editBooking(
                req.params,
                req.body
            );
            res.status(result.code).json(result?.result || result?.error);
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: "INTERNAL_SERVER_ERROR",
            });
        }
    };

    public deleteBooking = async (req, res) => {
        try {
            const userDetails = req.user;
            const { id } = req.params;
            const result = await this.clientService.deleteBooking(
                userDetails,
                id
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public getQuestionnaries = async (req, res) => {
        try {
            const userDetails = req.user;
            const result =
                await this.clientService.getQuestionnaries(userDetails);
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public getClientQuestionnaries = async (req, res) => {
        try {
            const userDetails = req.user;
            const { id } = req.params;
            const result = await this.clientService.getClientQuestionnaries(
                userDetails,
                id
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public deleteQuestionnaries = async (req, res) => {
        try {
            const userDetails = req.user;
            const { id } = req.params;
            const result = await this.clientService.deleteQuestionnaries(
                userDetails,
                id
            );
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public getStudioDashboard = async (req, res) => {
        try {
            const userDetails = req.user;
            const result =
                await this.clientService.getStudioDashboard(userDetails);
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };

    public getInvoiceSummary = async (req, res) => {
        try {
            const userDetails = req.user;
            const result =
                await this.clientService.getInvoiceSummary(userDetails);
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(error.code).json(error);
        }
    };
}
