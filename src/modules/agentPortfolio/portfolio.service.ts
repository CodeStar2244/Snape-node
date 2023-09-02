import { In } from "typeorm";
import { AppDataSource } from "../../db/db.config";
import Portfolios from "../../entities/Portfolio";
import { AWSS3 } from "../../helpers/awss3";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import {
  CDN_URL,
  FILE_ALREADY_EXISTS,
  FRONT_URL,
} from "../../config/constants";
import { AgentService } from "../user/agent.service";
import { uuid } from "uuidv4";
import { Utils } from "../../utils/utils";
import { Tblagent } from "../../entities/Tblagent";
import PortFolioFiles from "../../entities/portfolioFiles";

export class PortfolioService {
  private s3 = new AWSS3();
  private agentService = new AgentService();
  private utils = new Utils();
  public createPortfolio = async (body, userDetails) => {
    try {
      const agentRepo = AppDataSource.getRepository(Tblagent);
      const portfolioRepository = AppDataSource.getRepository(Portfolios);
      const slug = uuid();
      const agent = await agentRepo.findOne({
        where: {
          id: userDetails.id,
        },
      });
      const portfolio = await portfolioRepository.findOne({
        where: {
          createdBy: {
            id: agent.id,
          },
        },
      });
      if (portfolio) {
        return ResponseBuilder.badRequest("Portfolio Already Exists");
      }
      const newPortFolio = await portfolioRepository.save({
        name: agent.firstname + agent.lastname,
        createdBy: userDetails.id,
      });
      return ResponseBuilder.data(
        newPortFolio,
        "Portfolio created SuccessFully",
      );
    } catch (error) {
      console.log(error);
      throw ResponseBuilder.error(error);
    }
  };
  public getPortfolios = async (userDetails, search, order, sort) => {
    try {
      const portfolioRepository = AppDataSource.getRepository(Portfolios);
      const query = await portfolioRepository
        .createQueryBuilder("portfolios")
        .select("portfolios.name", "name")
        .addSelect("portfolios.id", "id")
        .addSelect("portfolios.coverPhoto", "coverPhoto")
        .addSelect("portfolios.photos", "photos")
        .addSelect("portfolios.videos", "videos")
        .where("portfolios.createdBy = :agentId", { agentId: userDetails.id })
        .loadRelationIdAndMap("agentId", "portfolios.createdBy");
      if (search) {
        query.andWhere("portfolios.name ILIKE :name", { name: `%${search}%` });
      }
      if (sort && order) {
        query.addOrderBy(`portfolios.${sort}`, order.toUpperCase());
      }
      const portfolios = await query.getRawMany();
      return ResponseBuilder.data(portfolios);
    } catch (error) {
      throw ResponseBuilder.error(error);
    }
  };

  public getPortfolioByID = async (userDetails, id) => {
    try {
      const portfolioRepository = AppDataSource.getRepository(Portfolios);
      // const portfolio = await portfolioRepository.findOneBy({ id: id, createdBy: userDetails.id });
      const portfolio = await portfolioRepository
        .createQueryBuilder("portfolios")
        .select("portfolios.name", "name")
        .addSelect("portfolios.id", "id")
        .addSelect("portfolios.status", "status")
        .addSelect("portfolios.coverPhoto", "coverPhoto")
        .addSelect("portfolios.photos", "photos")
        .addSelect("portfolios.videos", "videos")
        .addSelect("portfolios.createdAt", "createdAt")
        .addSelect("portfolios.updatedAt", "updatedAt")
        .where("portfolios.createdBy = :agentId", { agentId: userDetails.id })
        .andWhere("portfolios.id =:id", { id: Number(id) })
        .loadRelationIdAndMap("agentId", "portfolios.createdBy")
        .addGroupBy("portfolios.id")
        .getRawOne();
      if (!portfolio) {
        return ResponseBuilder.badRequest("Portfolio Not Found", 404);
      }
      return ResponseBuilder.data(portfolio);
    } catch (error) {
      throw ResponseBuilder.error(error);
    }
  };

  public deletePortfolio = async (userDetails, id) => {
    try {
      const portfolioRepository = AppDataSource.getRepository(Portfolios);
      const fileRepo = AppDataSource.getRepository(PortFolioFiles);
      const portfolio = await portfolioRepository.findOneBy({
        id: id,
        createdBy: {
          id: userDetails.id,
        },
      });
      if (!portfolio) {
        return ResponseBuilder.badRequest("Portfolio Not Found", 404);
      }
      const files = await fileRepo
        .createQueryBuilder("files")
        .where({ portfolio: id })
        .loadAllRelationIds()
        .orderBy({ "files.createdAt": "ASC" })
        .getMany();
      for (const file of files) {
        this.s3.deleteS3File(file.key);
      }
      await portfolioRepository.delete({ id: id });
      const agentSpace =
        await this.agentService.getRemaningBalance(userDetails);
      return agentSpace;
    } catch (error) {
      console.log(error, "er");
      throw ResponseBuilder.error(error);
    }
  };
  public deleteFiles = async (userDetails, id, ids) => {
    try {
      const portfolioRepository = AppDataSource.getRepository(Portfolios);
      const fileRepo = AppDataSource.getRepository(PortFolioFiles);
      const portfolio = await portfolioRepository.findOneBy({
        id: id,
        createdBy: {
          id: userDetails.id,
        },
      });
      if (!portfolio) {
        return ResponseBuilder.badRequest("Portfolio Not Found", 404);
      }
      const idsArr: number[] = ids;
      const queryOptions = {
        where: {
          portfolio: {
            id,
          },
          id: In(idsArr),
        },
      };
      const files = await fileRepo.find(queryOptions);
      for (const file of files) {
        this.s3.deleteS3File(file.key);
      }
      const filesToBeDeleted = await fileRepo.delete(ids);

      const agentSpace =
        await this.agentService.getRemaningBalance(userDetails);
      return agentSpace;
    } catch (error) {
      throw ResponseBuilder.error(error);
    }
  };
  public getPortfolioFiles = async (userDetails, id, search, sort, order) => {
    try {
      const portfolioRepository = AppDataSource.getRepository(Portfolios);
      const fileRepo = AppDataSource.getRepository(PortFolioFiles);
      const portfolio = await portfolioRepository.findOneBy({
        id: id,
        createdBy: userDetails.id,
      });
      if (!portfolio) {
        return ResponseBuilder.badRequest("Portfolio Not Found", 404);
      }
      const query = await fileRepo
        .createQueryBuilder("files")
        .select("files.id", "id")
        .addSelect("files.name", "name")
        .addSelect("files.key", "key")
        .addSelect("files.size", "size")
        .addSelect("files.compressedCdnUrl", "url")
        .addSelect("files.type", "type")
        .addSelect("files.createdAt", "createdAt")
        .addSelect("files.updatedAt", "updatedAt")
        .addSelect("files.portfolioId", "portfolioId")
        .where({ portfolio: id })
        .loadAllRelationIds();

      if (search) {
        query.andWhere("files.name like :name", { name: `%${search}%` });
      }
      if (sort && order) {
        query.addOrderBy(`files.${sort}`, order.toUpperCase());
      }
      const files = await query.getRawMany();
      return ResponseBuilder.data(files);
    } catch (error) {
      console.log(error);
      throw ResponseBuilder.error(error);
    }
  };
  public getPortfolioFilesName = async (userDetails, id) => {
    try {
      const portfolioRepository = AppDataSource.getRepository(Portfolios);
      const fileRepo = AppDataSource.getRepository(PortFolioFiles);
      const portfolio = await portfolioRepository.findOneBy({
        id: id,
        createdBy: {
          id: userDetails.id,
        },
      });
      if (!portfolio) {
        return ResponseBuilder.badRequest("Portfolio Not Found", 404);
      }
      const query = await fileRepo
        .createQueryBuilder("files")
        .select("files.name", "name")
        .where({ portfolio: id })
        .loadAllRelationIds();
      const files = await query.getRawMany();
      const fileNamesArr = [];
      for (const filename of files) {
        fileNamesArr.push(filename?.name);
      }
      return ResponseBuilder.data(fileNamesArr);
    } catch (error) {
      console.log(error);
      throw ResponseBuilder.error(error);
    }
  };

  public changeCoverPhoto = async (params, body, userDetails) => {
    try {
      const collectioRepo = AppDataSource.getRepository(Portfolios);
      const portfolio = await collectioRepo.findOneBy({
        id: params.id,
        createdBy: {
          id: userDetails.id,
        },
      });
      if (!portfolio) {
        return ResponseBuilder.badRequest("Portfolio Not Found", 404);
      }

      const updatePortfolio = await collectioRepo.update(params.id, {
        coverPhoto: body.url,
      });
      return ResponseBuilder.data(updatePortfolio);
    } catch (error) {
      throw ResponseBuilder.error(error, "Internal Server Error");
    }
  };
  public uploadFiles = async (params, body, userDetails) => {
    try {
      const collectioRepo = AppDataSource.getRepository(Portfolios);
      const fileRepo = AppDataSource.getRepository(PortFolioFiles);
      const portfolio = await collectioRepo.findOneBy({
        id: params.id,
        createdBy: {
          id: userDetails.id,
        },
      });
      if (!portfolio) {
        return ResponseBuilder.badRequest("Portfolio Not Found", 404);
      }
      const portfolioFiles = await this.getPortfolioFilesName(
        userDetails,
        portfolio.id,
      );
      const fileNamesArr: string[] = portfolioFiles.result;
      const files = body.files;
      const filesUploadArr = [];
      if (portfolio.photos === 0) {
        const compressedCollectoinPhoto =
          await this.utils.compressPortfolioImage(files[0].key, params.id);
        collectioRepo.save({
          ...portfolio,
          coverPhoto: CDN_URL + compressedCollectoinPhoto.key,
        });
      }
      for (const file of files) {
        const existFile = await fileRepo.findOne({ where: { key: file.key } });
        if (existFile) {
          await fileRepo.delete(existFile?.id);
        }
        if (fileNamesArr.includes(file.name)) {
          throw new Error(FILE_ALREADY_EXISTS);
        }
        const compressedKey = await this.utils.compressPortfolioImage(
          file.key,
          params.id,
        );
        filesUploadArr.push(
          fileRepo.save({
            name: file.name,
            url: file.url,
            size: file.size,
            type: file.type,
            key: file.key,
            cdnUrl: CDN_URL + file.key,
            compressedKey: compressedKey.key,
            compressedCdnUrl: CDN_URL + compressedKey.key,
            compressedImageSize: compressedKey.fileSize,
            height: file.height,
            width: file.width,
            portfolio: params.id,
          }),
        );
      }

      const reponse = await Promise.all(filesUploadArr);

      const agentSpace =
        await this.agentService.getRemaningBalance(userDetails);
      return agentSpace;
    } catch (error) {
      console.log(error, "errror");
      if (error.message === FILE_ALREADY_EXISTS) {
        throw ResponseBuilder.fileExists(error, FILE_ALREADY_EXISTS);
      }
      throw ResponseBuilder.error(error, "Internal Server Error");
    }
  };
}
