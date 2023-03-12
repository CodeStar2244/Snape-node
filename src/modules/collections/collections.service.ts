import { AppDataSource } from "../../db/db.config";
import Collections from "../../entities/Collection"
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { UpdateCollectionModel } from "./collections.model";

export class CollectionService {
    public createCollection = async (body, userDetails) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const collection = await collectionRepository.insert({
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
    public getCollections = async (userDetails) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const collections = await collectionRepository.find({
                where: {
                    createdBy: userDetails.id
                }
            });
            return ResponseBuilder.data(collections);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }



    }
    public getCollectionByID = async (userDetails,id) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const collection = await collectionRepository.findOneBy({id:id , createdBy:userDetails.id});
            if(!collection){
                return ResponseBuilder.badRequest("Collection Not Found" , 404);
            }
            return ResponseBuilder.data(collection);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }



    }
    public updateCollection = async (params, body, userDetails) => {
        try {
            const collectioRepo = AppDataSource.getRepository(Collections);
            const collection = await collectioRepo.findOneBy({id:params.id , createdBy:userDetails.id});
            if(!collection){
                return ResponseBuilder.badRequest("Collection Not Found" , 404);
            }
            const updateObject = new UpdateCollectionModel(body);
            await collectioRepo.save({...collection,...updateObject})
            return ResponseBuilder.data(updateObject);
        }
         catch (error) {
            if(+error.code === 23505){
             throw ResponseBuilder.errorMessage("Url already exists")
            }
            throw ResponseBuilder.error(error,"Internal Server Error")

        }



    }
}