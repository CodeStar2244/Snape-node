import { In } from "typeorm";
import { AppDataSource } from "../../db/db.config";
import Collections from "../../entities/Collection"
import { CollectionTags } from "../../entities/CollectionTags";
import FilesEntity from "../../entities/Files";
import { AWSS3 } from "../../helpers/awss3";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { UpdateCollectionModel } from "./collections.model";

export class CollectionService {
    private s3 = new AWSS3();
    public createCollection = async (body, userDetails) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const collection = await collectionRepository.save({
                name: body.name,
                eventDate: body.eventDate,
                createdBy: userDetails.id
            });
            return ResponseBuilder.data(collection, "Collection created SuccessFully");

        } catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }



    }
    public getCollections = async (userDetails,search,order,sort) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const query = await collectionRepository.createQueryBuilder("collections")
            .select("collections.name","name")
            .addSelect("collections.id","id")
            .addSelect("collections.coverPhoto","coverPhoto")
            .addSelect("collections.photos","photos")
            .addSelect("collections.videos","videos")
            .addSelect("collections.eventDate","eventDate")
            .where("collections.createdBy = :agentId",{agentId:userDetails.id})
            .loadRelationIdAndMap("agentId","collections.createdBy")
            if(search){
                query.andWhere('collections.name like :name',{name:`%${search}%`})
            }
            if(sort && order){
                query.addOrderBy(`collections.${sort}`,order.toUpperCase())
            }
            const collections = await query.getRawMany();
            return ResponseBuilder.data(collections);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }



    }
    public getCollectionByID = async (userDetails, id) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }
            return ResponseBuilder.data(collection);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }



    }
    public deleteCollection = async (userDetails, id) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const fileRepo = AppDataSource.getRepository(FilesEntity);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }
            const files = await fileRepo.createQueryBuilder("files")
            .where({collection:id}).loadAllRelationIds().orderBy({"files.createdAt":"ASC"}).getMany();
            for(const file of files){
                this.s3.deleteS3File(file.key);

            }
            await collectionRepository.delete({id:id});
            
            return ResponseBuilder.data(collection);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }



    }
    public deleteFiles = async (userDetails, id,ids) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const fileRepo = AppDataSource.getRepository(FilesEntity);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }
            const idsArr:Number[] = ids;
            const queryOptions = {
                where:{
                    collection:{
                        id
                    },
                    id:In(idsArr)
                }
            }
            const files = await fileRepo.find(queryOptions);
            console.log(files , "fa")
            for(const file of files){
                this.s3.deleteS3File(file.key);

            }
            const filesToBeDeleted = await fileRepo.delete(ids);
            
            return ResponseBuilder.data(filesToBeDeleted);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }



    }
    public getCollectionFiles = async (userDetails, id,search,sort,order) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const fileRepo = AppDataSource.getRepository(FilesEntity);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }
            const query = await fileRepo.createQueryBuilder("files")
            .where({collection:id}).loadAllRelationIds();

            if(search){
                query.andWhere('files.name like :name',{name:`%${search}%`})
            }
            if(sort && order){
                query.addOrderBy(`files.${sort}`,order.toUpperCase())
            }
            const files = await  query.getRawMany()
            return ResponseBuilder.data(files);
    
        } catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }



    }
    public updateCollection = async (params, body, userDetails) => {
        try {
            const collectioRepo = AppDataSource.getRepository(Collections);
            const tagRepo = AppDataSource.getRepository(CollectionTags)
            const collection = await collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }

            const { name, url, eventDate, download, downloadPin, socialSharing,status, password,tags } = new UpdateCollectionModel(body);
            const tagsArr = tags ? tags?.split(','):[];
            const collectionTagsArr = [];
            for(const tag of tagsArr){
                const prevTag = await tagRepo.findOneBy({tag:tag.trim()});
                const newTag = await tagRepo.save({...prevTag , tag:tag.trim()});
                collectionTagsArr.push(newTag);            

            }
            const updateObject = {
                name,
                url, eventDate, download, downloadPin, status, password,socialSharing,
            }

            await collectioRepo.save({ ...collection, ...updateObject,tags:collectionTagsArr })
            return ResponseBuilder.data(updateObject);
        }
        catch (error) {
            console.log(error , "error")
            if (+error.code === 23505) {
                throw ResponseBuilder.errorMessage("Url already exists")
            }
            throw ResponseBuilder.error(error, "Internal Server Error")

        }



    }
    public changeCoverPhoto = async (params, body, userDetails) => {
        try {
            const collectioRepo = AppDataSource.getRepository(Collections);
            const tagRepo = AppDataSource.getRepository(CollectionTags)
            const collection = await collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }

            const updateCollection = await collectioRepo.update(params.id,{coverPhoto:body.url});
            return ResponseBuilder.data(updateCollection);
        }
        catch (error) {
            throw ResponseBuilder.error(error, "Internal Server Error")

        }



    }
    public uploadFiles = async (params, body, userDetails) => {
        try {
            const collectioRepo = AppDataSource.getRepository(Collections);
            const fileRepo = AppDataSource.getRepository(FilesEntity);
            const collection = await collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id });
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }
            const files = body.files;
            const filesUploadArr = [];
            if(collection.photos === 0){
                collectioRepo.save({...collection,coverPhoto:files[0]?.url})
            }
            for(const file of files){
                filesUploadArr.push(fileRepo.save({
                    name:file.name,
                    url:file.url,
                    size:file.size,
                    type:file.type,
                    key:file.key,
                    collection:params.id
                }));
             }

             const reponse = await Promise.all(filesUploadArr);
            

            return ResponseBuilder.data(reponse,"Files Uploaded");


            
           
        }
        catch (error) {
            console.log(error , "error")
            if (+error.code === 23505) {
                throw ResponseBuilder.errorMessage("Url already exists")
            }
            throw ResponseBuilder.error(error, "Internal Server Error")

        }



    }
}