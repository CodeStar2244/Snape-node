import { In } from "typeorm";
import { AppDataSource } from "../../db/db.config";
import Collections from "../../entities/Collection"
import { CollectionDesign } from "../../entities/collectionDesign";
import { CollectionTags } from "../../entities/CollectionTags";
import FilesEntity from "../../entities/Files";
import { AWSS3 } from "../../helpers/awss3";
import { ResponseBuilder } from "../../helpers/responseBuilder";

export class ClientService {
    public getCollectionByUrl = async ({url,password}) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const collection = await collectionRepository.createQueryBuilder("collections")
            .leftJoin("collection_tag_join","tagsJoin","tagsJoin.collectionsId=collections.id")
            .leftJoin("collection_tags","tags","tagsJoin.collectionTagsId=tags.id")
            .select("collections.name","name")
            .addSelect("collections.id","id")
            .addSelect("collections.socialSharing","socialSharing")
            .addSelect("collections.download","download")
            .addSelect("collections.downloadPin","downloadPin")
            .addSelect("collections.url","url")
            .addSelect("collections.status","status")
            .addSelect("ARRAY_AGG(tags.tag)","tags")
            .addSelect("collections.coverPhoto","coverPhoto")
            .addSelect("collections.photos","photos")
            .addSelect("collections.videos","videos")
            .addSelect("collections.eventDate","eventDate")
            .addSelect("collections.createdAt","createdAt")
            .addSelect("collections.updatedAt","updatedAt")
            .where("collections.url = :agentId",{url:url})
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
            const collectionRepository = AppDataSource.getRepository(Collections);
            const designRepo = AppDataSource.getRepository(CollectionDesign);
            const collection = await collectionRepository.findOneBy({ id: id, createdBy: userDetails.id })
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }
            const collectionDesign = await designRepo.findOneBy({collections:{
                id:id
            }})
            return ResponseBuilder.data(collectionDesign);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }



    }

}