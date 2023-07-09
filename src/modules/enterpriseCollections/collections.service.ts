import { In } from "typeorm";
import { AppDataSource } from "../../db/db.config";
import { CollectionThemes } from "../../entities/CollectionThemes";
import { AWSS3 } from "../../helpers/awss3";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { UpdateCollectionModel, CollectionDesignModel } from "./collections.model";
import { CDN_URL, FILE_ALREADY_EXISTS, FRONT_URL } from "../../config/constants";
import { uuid } from 'uuidv4';
import EnterpriseCollections from "../../entities/enterpriseCollections";
import { EnterpriseCollectionTags } from "../../entities/enterpriseCollectionTags";
import { EnterpriseCollectionDesign } from "../../entities/enterprisecollectionDesign";
import EnterpriseFilesEntity from "../../entities/enterpriseFiles";
import { EnterpriseClientService } from "../enterpriseUser/enterpriseclient.service";
import { Utils } from "../../utils/utils";

export class CollectionService {
    private s3 = new AWSS3();
    private utils = new Utils();
    private enterpriseClientService = new EnterpriseClientService();
    public createCollection = async (body, userDetails) => {
        try {
            const collectionRepository = AppDataSource.getRepository(EnterpriseCollections);
            const designRepo = AppDataSource.getRepository(EnterpriseCollectionDesign);
            const themerepo = AppDataSource.getRepository(CollectionThemes);
            const slug = uuid();
            const collection = await collectionRepository.save({
                name: body.name,
                eventDate: body.eventDate,
                url:FRONT_URL+slug,
                slug,
                createdBy: userDetails.id
            });
            const theme = await themerepo.findOneBy({ id: 1 });
            await designRepo.save({
                typography: "Sans",
                collections: collection,
                theme: theme
            })
            return ResponseBuilder.data(collection, "Collection created SuccessFully");

        } catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }



    }
    public getCollections = async (userDetails, search, order, sort) => {
        try {
            const collectionRepository = AppDataSource.getRepository(EnterpriseCollections);
            const query = await collectionRepository.createQueryBuilder("collections")
                .select("collections.name", "name")
                .addSelect("collections.id", "id")
                .addSelect("collections.coverPhoto", "coverPhoto")
                .addSelect("collections.photos", "photos")
                .addSelect("collections.videos", "videos")
                .addSelect("collections.eventDate", "eventDate")
                .where("collections.createdBy = :clientId", { clientId: userDetails.id })
                .loadRelationIdAndMap("clientId", "collections.createdBy")
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
    public listThemes = async () => {
        try {
            const themeRepository = AppDataSource.getRepository(CollectionThemes);
            const themes = await themeRepository.find()
            return ResponseBuilder.data(themes);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }



    }
    public getCollectionByID = async (userDetails, id) => {
        try {
            const collectionRepository = AppDataSource.getRepository(EnterpriseCollections);
            // const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            const collection = await collectionRepository.createQueryBuilder("collections")
                .leftJoin("collection_tag_join", "tagsJoin", "tagsJoin.collectionsId=collections.id")
                .leftJoin("collection_tags", "tags", "tagsJoin.collectionTagsId=tags.id")
                .select("collections.name", "name")
                .addSelect("collections.id", "id")
                .addSelect("collections.socialSharing", "socialSharing")
                .addSelect("collections.download", "download")
                .addSelect("collections.password", "password")
                .addSelect("collections.downloadPin", "downloadPin")
                .addSelect("collections.slug", "url")
                .addSelect("collections.status", "status")
                .addSelect("array_remove(array_agg(tags.tag), NULL)", "tags")
                .addSelect("collections.coverPhoto", "coverPhoto")
                .addSelect("collections.photos", "photos")
                .addSelect("collections.videos", "videos")
                .addSelect("collections.eventDate", "eventDate")
                .addSelect("collections.createdAt", "createdAt")
                .addSelect("collections.updatedAt", "updatedAt")
                .where("collections.createdBy = :clientId", { clientId: userDetails.id })
                .andWhere("collections.id =:id", { id: Number(id) })
                .loadRelationIdAndMap("clientId", "collections.createdBy")
                .addGroupBy("collections.id")
                .getRawOne()
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }
            return ResponseBuilder.data(collection);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }



    }
    public getCollectionDesign = async (userDetails, id) => {
        try {
            const collectionRepository = AppDataSource.getRepository(EnterpriseCollections);
            const designRepo = AppDataSource.getRepository(EnterpriseCollectionDesign);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id })
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }
            const collectionDesign = await designRepo.findOne(
                {
                    where: {
                        collections: {
                            id
                        }
                    },
                    relations: ["theme"]
                }
            )
            return ResponseBuilder.data(collectionDesign);

        } catch (error) {
            console.log(error, "er")
            throw ResponseBuilder.error(error)

        }



    }

    public deleteCollection = async (userDetails, id) => {
        try {
            const collectionRepository = AppDataSource.getRepository(EnterpriseCollections);
            const fileRepo = AppDataSource.getRepository(EnterpriseFilesEntity);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }
            const files = await fileRepo.createQueryBuilder("files")
                .where({ collection: id }).loadAllRelationIds().orderBy({ "files.createdAt": "ASC" }).getMany();
            for (const file of files) {
                this.s3.deleteS3File(file.key);

            }
            await collectionRepository.delete({ id: id });
            const clientSpace = await this.enterpriseClientService.getEnterpriseRemaningBalance(userDetails);
            return clientSpace;

        } catch (error) {
            console.log(error, "er")
            throw ResponseBuilder.error(error)

        }



    }
    public deleteFiles = async (userDetails, id, ids) => {
        try {
            const collectionRepository = AppDataSource.getRepository(EnterpriseCollections);
            const fileRepo = AppDataSource.getRepository(EnterpriseFilesEntity);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
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
        
            const clientSpace = await this.enterpriseClientService.getEnterpriseRemaningBalance(userDetails);
            return clientSpace;

        } catch (error) {
            throw ResponseBuilder.error(error)

        }



    }
    public getCollectionFiles = async (userDetails, id, search, sort, order) => {
        try {
            const collectionRepository = AppDataSource.getRepository(EnterpriseCollections);
            const fileRepo = AppDataSource.getRepository(EnterpriseFilesEntity);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
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
    public getCollectionFilesName = async (userDetails, id) => {
        try {
            const collectionRepository = AppDataSource.getRepository(EnterpriseCollections);
            const fileRepo = AppDataSource.getRepository(EnterpriseFilesEntity);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
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
    public updateCollection = async (params, body, userDetails) => {
        try {
            const collectioRepo = AppDataSource.getRepository(EnterpriseCollections);
            const tagRepo = AppDataSource.getRepository(EnterpriseCollectionTags)
            const collection = await collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }
            console.log(body)
            const { name, url, eventDate, download, downloadPin, socialSharing, status, password, tags, coverPhoto, slug } = new UpdateCollectionModel(body);
            const tagsArr = tags ? tags : [];
            const collectionTagsArr = [];
            for (const tag of tagsArr) {
                const prevTag = await tagRepo.findOneBy({ tag: tag.trim() });
                const newTag = await tagRepo.save({ ...prevTag, tag: tag.trim() });
                collectionTagsArr.push(newTag);

            }
            const updateObject = {
                name,
                url, eventDate, download, downloadPin, status, password, socialSharing, coverPhoto, slug
            }
            await collectioRepo.save({ ...collection, ...updateObject, tags: collectionTagsArr })
            return this.getCollectionByID(userDetails, collection.id);
        }
        catch (error) {
            console.log(error, "error")
            if (+error.code === 23505) {
                throw ResponseBuilder.errorMessage("Url already exists")
            }
            throw ResponseBuilder.error(error, "Internal Server Error")

        }



    }
    public collectionDesign = async (params, body, userDetails) => {
        try {
            const collectioRepo = AppDataSource.getRepository(EnterpriseCollections);
            const designRepo = AppDataSource.getRepository(EnterpriseCollectionDesign);
            const themerepo = AppDataSource.getRepository(CollectionThemes);
            const collection = await collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }
            const collectionDesign = await designRepo.findOneBy({
                collections: {
                    id: collection.id
                }
            });
            const { theme, x, y, gridSpacing, gridStyle, typography } = new CollectionDesignModel(body);
            const updateObject = {
                theme, focusX: x, focusY: y, gridSpacing, gridStyle, typography, collection: collection.id
            }
            const updatedTheme = await themerepo.findOneBy({ id: theme });
            await designRepo.save({ ...collectionDesign, ...updateObject, collections: collection, theme: updatedTheme })
            return ResponseBuilder.data(updateObject);
        }
        catch (error) {
            console.log(error, "error")
            if (+error.code === 23505) {
                throw ResponseBuilder.errorMessage("Url already exists")
            }
            throw ResponseBuilder.error(error, "Internal Server Error")

        }



    }
    public changeCoverPhoto = async (params, body, userDetails) => {
        try {
            const collectioRepo = AppDataSource.getRepository(EnterpriseCollections);
            const tagRepo = AppDataSource.getRepository(EnterpriseCollectionTags)
            const collection = await collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }

            const updateCollection = await collectioRepo.update(params.id, { coverPhoto: body.url });
            return ResponseBuilder.data(updateCollection);
        }
        catch (error) {
            throw ResponseBuilder.error(error, "Internal Server Error")

        }



    }
    public uploadFiles = async (params, body, userDetails) => {
        try {
            const collectioRepo = AppDataSource.getRepository(EnterpriseCollections);
            const fileRepo = AppDataSource.getRepository(EnterpriseFilesEntity);
            const collection = await collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }
            const collectionFiles = await this.getCollectionFilesName(userDetails, collection.id);
            const fileNamesArr: string[] = collectionFiles.result;
            const files = body.files;
            const filesUploadArr = [];
            if (collection.photos === 0) {
                collectioRepo.save({ ...collection, coverPhoto: CDN_URL + files[0].key })
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

            const clientSpace = await this.enterpriseClientService.getEnterpriseRemaningBalance(userDetails);
            return clientSpace;




        }
        catch (error) {
            if (error.message === FILE_ALREADY_EXISTS) {
                throw ResponseBuilder.fileExists(error, FILE_ALREADY_EXISTS)
            }
            throw ResponseBuilder.error(error, "Internal Server Error")

        }



    }
}