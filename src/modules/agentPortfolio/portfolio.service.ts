import { In } from "typeorm";
import { AppDataSource } from "../../db/db.config";
import Portfolios from "../../entities/Portfolio"
import FilesEntity from "../../entities/Files";
import { AWSS3 } from "../../helpers/awss3";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { UpdatePortfolioModel, PortfolioDesignModel } from "./portfolio.model";
import { CDN_URL, FILE_ALREADY_EXISTS, FRONT_URL } from "../../config/constants";
import { AgentService } from "../user/agent.service";
import { uuid } from 'uuidv4';
import { Utils } from "../../utils/utils";
import { Tblagent } from "../../entities/Tblagent";

export class PortfolioService {
    private s3 = new AWSS3();
    private agentService = new AgentService();
    private utils = new Utils();
    public createPortfolio = async (body, userDetails) => {
        try {
            const agentRepo = AppDataSource.getRepository(Tblagent);
            const collectionRepository = AppDataSource.getRepository(Portfolios);
            const slug = uuid();
            const agent = await agentRepo.findOne({
                where:{
                    id:userDetails.id
                }
            });
            const portfolio = await collectionRepository.findOne({
                where:{
                    createdBy:agent.id
                }
            });
            if(portfolio){
                return ResponseBuilder.badRequest("Portfolio Already Exists");
            }
            const collection = await collectionRepository.save({
                name: agent.firstname + agent.lastname,
                createdBy: userDetails.id
            });
            return ResponseBuilder.data(collection, "Portfolio created SuccessFully");

        } catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }



    }
    public getPortfolios = async (userDetails, search, order, sort) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Portfolios);
            const query = await collectionRepository.createQueryBuilder("collections")
                .select("collections.name", "name")
                .addSelect("collections.id", "id")
                .addSelect("collections.coverPhoto", "coverPhoto")
                .addSelect("collections.photos", "photos")
                .addSelect("collections.videos", "videos")
                .where("collections.createdBy = :agentId", { agentId: userDetails.id })
                .loadRelationIdAndMap("agentId", "collections.createdBy")
            if (search) {
                query.andWhere('collections.name ILIKE :name', { name: `%${search}%` })
            }
            if (sort && order) {
                query.addOrderBy(`collections.${sort}`, order.toUpperCase())
            }
            const collections = await query.getRawMany();
            return ResponseBuilder.data(collections);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }



    }

    public getPortfolioByID = async (userDetails, id) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Portfolios);
            // const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            const collection = await collectionRepository.createQueryBuilder("collections")
                .select("collections.name", "name")
                .addSelect("collections.id", "id")
                .addSelect("collections.status", "status")
                .addSelect("collections.coverPhoto", "coverPhoto")
                .addSelect("collections.photos", "photos")
                .addSelect("collections.videos", "videos")
                .addSelect("collections.createdAt", "createdAt")
                .addSelect("collections.updatedAt", "updatedAt")
                .where("collections.createdBy = :agentId", { agentId: userDetails.id })
                .andWhere("collections.id =:id", { id: Number(id) })
                .loadRelationIdAndMap("agentId", "collections.createdBy")
                .addGroupBy("collections.id")
                .getRawOne()
            if (!collection) {
                return ResponseBuilder.badRequest("Portfolio Not Found", 404);
            }
            return ResponseBuilder.data(collection);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }



    }

    public deletePortfolio = async (userDetails, id) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Portfolios);
            const fileRepo = AppDataSource.getRepository(FilesEntity);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Portfolio Not Found", 404);
            }
            const files = await fileRepo.createQueryBuilder("files")
                .where({ collection: id }).loadAllRelationIds().orderBy({ "files.createdAt": "ASC" }).getMany();
            for (const file of files) {
                this.s3.deleteS3File(file.key);

            }
            await collectionRepository.delete({ id: id });
            const agentSpace = await this.agentService.getRemaningBalance(userDetails);
            return agentSpace;

        } catch (error) {
            console.log(error, "er")
            throw ResponseBuilder.error(error)

        }



    }
    public deleteFiles = async (userDetails, id, ids) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Portfolios);
            const fileRepo = AppDataSource.getRepository(FilesEntity);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Portfolio Not Found", 404);
            }
            const idsArr: Number[] = ids;
            const queryOptions = {
                where: {
                    collection: {
                        id
                    },
                    id: In(idsArr)
                }
            }
            const files = await fileRepo.find(queryOptions);
            for (const file of files) {
                this.s3.deleteS3File(file.key);

            }
            const filesToBeDeleted = await fileRepo.delete(ids);
        
            const agentSpace = await this.agentService.getRemaningBalance(userDetails);
            return agentSpace;

        } catch (error) {
            throw ResponseBuilder.error(error)

        }



    }
    public getPortfolioFiles = async (userDetails, id, search, sort, order) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Portfolios);
            const fileRepo = AppDataSource.getRepository(FilesEntity);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Portfolio Not Found", 404);
            }
            const query = await fileRepo.createQueryBuilder("files")
                .select("files.id", "id")
                .addSelect("files.name", "name")
                .addSelect("files.key", "key")
                .addSelect("files.size", "size")
                .addSelect("files.compressedCdnUrl", "url")
                .addSelect("files.type", "type")
                .addSelect("files.createdAt", "createdAt")
                .addSelect("files.updatedAt", "updatedAt")
                .addSelect("files.collectionId", "collectionId")
                .where({ collection: id }).loadAllRelationIds();

            if (search) {
                query.andWhere('files.name like :name', { name: `%${search}%` })
            }
            if (sort && order) {
                query.addOrderBy(`files.${sort}`, order.toUpperCase())
            }
            const files = await query.getRawMany()
            return ResponseBuilder.data(files);

        } catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }



    }
    public getPortfolioFilesName = async (userDetails, id) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Portfolios);
            const fileRepo = AppDataSource.getRepository(FilesEntity);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Portfolio Not Found", 404);
            }
            const query = await fileRepo.createQueryBuilder("files")
                .select("files.name", "name")
                .where({ collection: id }).loadAllRelationIds();
            const files = await query.getRawMany();
            const fileNamesArr = [];
            for (const filename of files) {
                fileNamesArr.push(filename?.name)
            }
            return ResponseBuilder.data(fileNamesArr);

        } catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }



    }

    public changeCoverPhoto = async (params, body, userDetails) => {
        try {
            const collectioRepo = AppDataSource.getRepository(Portfolios);
            const collection = await collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Portfolio Not Found", 404);
            }

            const updatePortfolio = await collectioRepo.update(params.id, { coverPhoto: body.url });
            return ResponseBuilder.data(updatePortfolio);
        }
        catch (error) {
            throw ResponseBuilder.error(error, "Internal Server Error")

        }



    }
    public uploadFiles = async (params, body, userDetails) => {
        try {
            const collectioRepo = AppDataSource.getRepository(Portfolios);
            const fileRepo = AppDataSource.getRepository(FilesEntity);
            const collection = await collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Portfolio Not Found", 404);
            }
            const collectionFiles = await this.getPortfolioFilesName(userDetails, collection.id);
            const fileNamesArr: string[] = collectionFiles.result;
            const files = body.files;
            const filesUploadArr = [];
            if (collection.photos === 0) {
                const compressedCollectoinPhoto = await this.utils.compressImage(files[0].key,params.id);
                collectioRepo.save({ ...collection, coverPhoto: CDN_URL + compressedCollectoinPhoto.key })
            }
            for (const file of files) {

                const existFile = await fileRepo.findOne({ where: { key: file.key } })
                if (existFile) {
                    await fileRepo.delete(existFile?.id)
                }
                if (fileNamesArr.includes(file.name)) {
                    throw new Error(FILE_ALREADY_EXISTS);

                }
                const compressedKey = await this.utils.compressImage(file.key,params.id);
                filesUploadArr.push(fileRepo.save({
                    name: file.name,
                    url: file.url,
                    size: file.size,
                    type: file.type,
                    key: file.key,
                    cdnUrl: CDN_URL + file.key,
                    compressedKey:compressedKey.key,
                    compressedCdnUrl:CDN_URL + compressedKey.key,
                    compressedImageSize:compressedKey.fileSize,
                    height: file.height,
                    width: file.width,
                    collection: params.id
                }));
            }

            const reponse = await Promise.all(filesUploadArr);

            const agentSpace = await this.agentService.getRemaningBalance(userDetails);
            return agentSpace;




        }
        catch (error) {
            if (error.message === FILE_ALREADY_EXISTS) {
                throw ResponseBuilder.fileExists(error, FILE_ALREADY_EXISTS)
            }
            throw ResponseBuilder.error(error, "Internal Server Error")

        }



    }
}