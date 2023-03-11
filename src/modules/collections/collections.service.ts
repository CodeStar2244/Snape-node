import { AppDataSource } from "../../db/db.config";
import Collections from "../../entities/Collection"
import { ResponseBuilder } from "../../helpers/responseBuilder";

export class CollectionService {
    public createCollection = async (body,userDetails) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const collection = await collectionRepository.insert({
                name: body.name,
                eventDate: body.eventDate,
                createdBy:userDetails.id
            });
            return ResponseBuilder.data(collection,"Collection created SuccessFully");

        } catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }



    }
    public getCollections = async (userDetails) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const collections = await collectionRepository.find({where:{
                createdBy:userDetails.id
            }});
            return ResponseBuilder.data(collections);

        } catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }



    }
}