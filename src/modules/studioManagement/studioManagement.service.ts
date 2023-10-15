import { AppDataSource } from "../../db/db.config";
import StudioClient from "../../entities/studioClient";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { StudioSpeciality } from "../../entities/studioSpeciality";
import {
  CDN_URL,
  FILE_ALREADY_EXISTS,
  FRONT_URL,
} from "../../config/constants";
import { StudioTemplate } from "../../entities/studioTemplate";
import { StudioQuestionnaries } from "../../entities/studioQuestionnaries";
import { Mailer } from "../../helpers/mailer";
import StudioInvoice from "../../entities/studioInvoice";
import moment from "moment-timezone";
import StudioQuotation from "../../entities/studioQuotation";
export class StudioManagementService {
  public createClient = async (userDetails, body) => {
    try {
      const studioClientRepository = AppDataSource.getRepository(StudioClient);
      let params = { ...body, createdBy: userDetails.id };
      if (body.profileUrl) {
        params = { ...params, profileUrl: CDN_URL + body.profileUrl };
      }
      const studioClient = await studioClientRepository.save(params);

      return ResponseBuilder.data(
        studioClient,
        "Studio Client created SuccessFully",
      );
    } catch (error) {
      console.log(error);
      throw ResponseBuilder.error(error);
    }
  };

  public getClient = async (userDetails, search) => {
    try {
      const studioClientRepository = AppDataSource.getRepository(StudioClient);
      const query = await studioClientRepository
        .createQueryBuilder("studioclient")
        .select("studioclient.id", "id")
        .addSelect("studioclient.name", "name")
        .addSelect("studioclient.email", "email")
        .addSelect("studioclient.phone", "phone")
        .addSelect("studioclient.profileUrl", "profileUrl")
        .addSelect("studioclient.createdAt", "createdAt")
        .where("studioclient.createdBy = :agentId", { agentId: userDetails.id })
        .loadRelationIdAndMap("agentId", "studioclient.createdBy");
      if (search) {
        query.andWhere("studioclient.name ILIKE :name", {
          name: `%${search}%`,
        });
        query.andWhere("studioclient.email ILIKE :name", {
          name: `%${search}%`,
        });
      }
      const studioclient = await query.getRawMany();
      return ResponseBuilder.data(studioclient);
    } catch (error) {
      throw ResponseBuilder.error(error);
    }
  };

  public getClientDetails = async (userDetails, clientId: number) => {
    try {
      const studioClientRepository = AppDataSource.getRepository(StudioClient);
      const studioclient = await studioClientRepository.findOne({
        where: {
          id: clientId,
          createdBy: userDetails.id,
        },
      });
      return ResponseBuilder.data(studioclient);
    } catch (error) {
      throw ResponseBuilder.error(error);
    }
  };

  editClient = async (params, body, userDetails) => {
    try {
      if (body.profileUrl) {
        body = { ...body, profileUrl: CDN_URL + body.profileUrl };
      }
      await AppDataSource.getRepository(StudioClient)
        .createQueryBuilder()
        .update(StudioClient)
        .set(body)
        .where("id = :id", { id: params.id })
        .execute();

      const specialityRepository = await AppDataSource.getRepository(
        StudioClient,
      )
        .createQueryBuilder("faq")
        .where("faq.id = :id", { id: params.id })
        .getOne();

      return ResponseBuilder.data({
        message: "Client edit successfully",
        data: specialityRepository,
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public deleteClient = async (userDetails, clientId: number) => {
    try {
      const studioClientRepository = AppDataSource.getRepository(StudioClient);
      const studioClient = await studioClientRepository.findOne({
        where: {
          id: clientId,
          createdBy: userDetails.id,
        },
      });
      if (!studioClient) {
        return ResponseBuilder.badRequest("Client Not Found", 404);
      }
      await studioClientRepository.delete({ id: clientId });
      return ResponseBuilder.data(studioClient);
    } catch (error) {
      throw ResponseBuilder.error(error);
    }
  };

  addSpeciality = async (params: any, user: any): Promise<any> => {
    try {
      params.createdBy = user.id;
      const specialityRepository =
        AppDataSource.getRepository(StudioSpeciality);
      if (params.imageUrl) {
        params = { ...params, imageUrl: CDN_URL + params.imageUrl };
      }
      const createUser = specialityRepository.create(params);
      const data = await specialityRepository.save(createUser);
      return ResponseBuilder.data({
        data,
        message: "Speciality added successfully",
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  getSpeciality = async (user: any): Promise<any> => {
    try {
      const specialityRepository =
        AppDataSource.getRepository(StudioSpeciality);

      const query = await specialityRepository
        .createQueryBuilder("studioclient")
        .select("studioclient.id", "id")
        .addSelect("studioclient.name", "name")
        .addSelect("studioclient.imageUrl", "imageUrl")
        .addSelect("studioclient.createdAt", "createdAt")
        .where("studioclient.createdBy = :agentId", { agentId: user.id })
        .loadRelationIdAndMap("agentId", "studioclient.createdBy")
        .getRawMany();

      return ResponseBuilder.data({ data: { specialityDetails: query } });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };
  editSpeciality = async (params, body): Promise<any> => {
    try {
      if (body.imageUrl) {
        body = { ...params, imageUrl: CDN_URL + body.imageUrl };
      }
      await AppDataSource.getRepository(StudioSpeciality)
        .createQueryBuilder()
        .update(StudioSpeciality)
        .set(body)
        .where("id = :id", { id: params.id })
        .execute();

      const specialityRepository = await AppDataSource.getRepository(
        StudioSpeciality,
      )
        .createQueryBuilder("faq")
        .where("faq.id = :id", { id: params.id })
        .getOne();

      return ResponseBuilder.data({
        message: "Speciality edit successfully",
        data: specialityRepository,
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  deleteSpeciality = async (params): Promise<any> => {
    try {
      const userRepository = AppDataSource.getRepository(StudioSpeciality);
      await userRepository.delete({ id: params.id });
      return ResponseBuilder.data({ message: "Faq deleted successfully" });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public getTemplates = async (user, type) => {
    try {
      const templateRepo = AppDataSource.getRepository(StudioTemplate);
      const template = await templateRepo.findOne({
        where: {
          createdBy: { id: user?.id },
          type: type,
        },
      });
      return ResponseBuilder.data({ data: { template: template } });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public createTemplates = async (user, params) => {
    try {
      const templateRepo = AppDataSource.getRepository(StudioTemplate);
      const isExist = await templateRepo.findOne({
        where: {
          createdBy: { id: user?.id },
          type: params?.type,
        },
      });
      if (isExist) {
        await templateRepo.update(
          {
            createdBy: { id: user?.id },
            type: params?.type,
          },
          params,
        );
        return ResponseBuilder.data({
          message: "Template updated successfully",
        });
      }
      await templateRepo.save({
        ...params,
        createdBy: user?.id,
      });
      return ResponseBuilder.data({ message: "Template updated successfully" });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public createQuestionnaries = async (user, params) => {
    try {
      const quesRepo = AppDataSource.getRepository(StudioQuestionnaries);
      const templateRepo = AppDataSource.getRepository(StudioTemplate);
      const clientRepo = AppDataSource.getRepository(StudioClient);

      const template = await templateRepo.findOne({
        where: {
          type: params?.type,
          createdBy: user?.id,
        },
      });

      const fields = {
        description: template.description,
        fields: template.fields,
      };

      const client = await clientRepo.findOne({
        where: { id: params?.clientId },
      });

      const questionnarires = await quesRepo.save({
        ...params,
        template: fields,
        createdBy: user?.id,
      });

      const renderData = {
        userName: user?.firstName + " " + user?.lastName,
        clientName: client?.name,
        message: params?.message,
        link: `https://studio.snape.app/view/questionnaries/${questionnarires?.id}`,
        // link: `http://localhost:3000/view/questionnaries/${questionnarires?.id}`,
        userEmail: user.email,
      };

      const mailBody = await Mailer.renderTemplate(
        "Questionarries",
        renderData,
      );
      Mailer.sendMail(params.email, params?.subject, mailBody);
      return ResponseBuilder.data({
        data: { questionnarires },
        message: "Questionnaries created successfully",
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public createInvoice = async (user, params) => {
    try {
      const invoiceRepo = AppDataSource.getRepository(StudioInvoice);
      const clientRepo = AppDataSource.getRepository(StudioClient);

      const client = await clientRepo.findOne({
        where: { id: params?.clientId },
      });

      const invoice = await invoiceRepo.save({
        ...params,
        clientId:client?.id,
        createdBy: user?.id,
      });

      const formattedDate = moment(invoice?.dueOnReceipt).format("MMMM D, YYYY");

      const renderData = {
        userName: user?.firstName + " " + user?.lastName,
        invoiceName: invoice?.name,
        invoiceAmount:invoice?.totalAmount,
        invoiceDetails:invoice?.invoiceDetails,
        dueDate:formattedDate,
        clientName: client?.name,
        currency: invoice?.currency,
        userEmail: user.email,
      };

      const mailBody = await Mailer.renderTemplate(
        "Invoice",
        renderData,
      );
      Mailer.sendMail(client?.email, params?.subject, mailBody);
      return ResponseBuilder.data({
        data: { invoice },
        message: "invoice created successfully",
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public getInvoices = async (user) => {
    try {
      const quesRepo = AppDataSource.getRepository(StudioInvoice);
      const invoices = await quesRepo.find({
        where: {createdBy: { id: user?.id } },
        relations: ["clientId"],
      });
      return ResponseBuilder.data({
        data: { invoices },
        message: "Invoices listed successfully",
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public getInvoice = async (user, id) => {
    try {
      const quesRepo = AppDataSource.getRepository(StudioInvoice);
      const invoice = await quesRepo.findOne({
        where: { id, createdBy: { id: user?.id } },
        relations: ["clientId"],
      });
      return ResponseBuilder.data({
        data: { invoice },
        message: "Invoice get successfully",
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public editInvoice = async (params, body): Promise<any> => {
    try {
      const invoiceRepo = AppDataSource.getRepository(StudioInvoice);
      
      await invoiceRepo.update(
          { id: params?.id },
          body,
      );

      const invoice = await invoiceRepo.findOne({
        where: { id:params?.id},
        relations: ["clientId"],
      });

      return ResponseBuilder.data({
        message: "Invoice edit successfully",
        data: invoice,
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public deleteInvoice = async (user, id) => {
    try {
      const invoiceRepo = AppDataSource.getRepository(StudioInvoice);

      await invoiceRepo.delete({
        id,
        createdBy: { id: user?.id },
      });

      return ResponseBuilder.data({
        data: {},
        message: "Invoices deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };


  

  public createQuotation = async (user, params) => {
    try {
      const invoiceRepo = AppDataSource.getRepository(StudioQuotation);
      const clientRepo = AppDataSource.getRepository(StudioClient);

      const client = await clientRepo.findOne({
        where: { id: params?.clientId },
      });

      const invoice = await invoiceRepo.save({
        ...params,
        clientId:client?.id,
        createdBy: user?.id,
      });

      const renderData = {
        userName: user?.firstName + " " + user?.lastName,
        invoiceName: invoice?.name,
        invoiceAmount:invoice?.totalAmount,
        invoiceDetails:invoice?.invoiceDetails,
        validFor:invoice?.validFor,
        clientName: client?.name,
        currency: invoice?.currency,
        userEmail: user.email,
      };

      const mailBody = await Mailer.renderTemplate(
        "Quotation",
        renderData,
      );
      Mailer.sendMail(client?.email, params?.subject, mailBody);
      return ResponseBuilder.data({
        data: { invoice },
        message: "quotation created successfully",
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public getQuotations = async (user) => {
    try {
      const quesRepo = AppDataSource.getRepository(StudioQuotation);
      const quotations = await quesRepo.find({
        where: {createdBy: { id: user?.id } },
        relations: ["clientId"],
      });
      return ResponseBuilder.data({
        data: { quotations },
        message: "Quotations listed successfully",
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public getQuotation = async (user, id) => {
    try {
      const quesRepo = AppDataSource.getRepository(StudioQuotation);
      const quotation = await quesRepo.findOne({
        where: { id, createdBy: { id: user?.id } },
        relations: ["clientId"],
      });
      return ResponseBuilder.data({
        data: { quotation },
        message: "Quotation get successfully",
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public editQuotation = async (params, body): Promise<any> => {
    try {
      const invoiceRepo = AppDataSource.getRepository(StudioQuotation);
      
      await invoiceRepo.update(
          { id: params?.id },
          body,
      );

      const quotation = await invoiceRepo.findOne({
        where: { id:params?.id},
        relations: ["clientId"],
      });

      return ResponseBuilder.data({
        message: "Quotation edit successfully",
        data: quotation,
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public deleteQuotation = async (user, id) => {
    try {
      const invoiceRepo = AppDataSource.getRepository(StudioQuotation);

      await invoiceRepo.delete({
        id,
        createdBy: { id: user?.id },
      });

      return ResponseBuilder.data({
        data: {},
        message: "Quotation deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public getQuestionnaries = async (user) => {
    try {
      const quesRepo = AppDataSource.getRepository(StudioQuestionnaries);
      const questionnarires = await quesRepo.find({
        where: { createdBy: { id: user?.id } },
        order: { createdAt: "DESC" },
        relations: ["clientId"],
        select: ["id", "email", "name", "type", "status", "createdAt"],
      });
      return ResponseBuilder.data({
        data: { questionnarires },
        message: "Questionnaries created successfully",
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public getClientQuestionnaries = async (user, id) => {
    try {
      const quesRepo = AppDataSource.getRepository(StudioQuestionnaries);
      const questionnarires = await quesRepo.findOne({
        where: { id, createdBy: { id: user?.id } },
        relations: ["clientId"],
      });
      return ResponseBuilder.data({
        data: { questionnarires },
        message: "Questionnaries created successfully",
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };

  public deleteQuestionnaries = async (user, id) => {
    try {
      const quesRepo = AppDataSource.getRepository(StudioQuestionnaries);

      await quesRepo.delete({
        id,
        createdBy: { id: user?.id },
      });

      return ResponseBuilder.data({
        data: {},
        message: "Questionnaries deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return ResponseBuilder.badRequest(error?.message);
    }
  };
}
