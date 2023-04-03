import { In } from "typeorm";
import { AppDataSource } from "../../db/db.config";
import Collections, { CollectionStatus } from "../../entities/Collection"
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
            .leftJoin("collection_design","collectionDesign","collectionDesign.collectionId=collections.id")
            .leftJoin("collection_themes","themes","collectionDesign.theme=themes.id")
            .select("collections.name","name")
            .addSelect("collections.id","id")
            .addSelect("collectionDesign.gridStyle","gridStyle")
            .addSelect("collectionDesign.gridSpacing","gridSpacing")
            .addSelect("collectionDesign.typography","typography")
            .addSelect("themes.background","background")
            .addSelect("themes.button","button")
            .addSelect("themes.accent","accent")
            .addSelect("collections.socialSharing","socialSharing")
            .addSelect("collections.download","download")
            .addSelect("collections.downloadPin","downloadPin")
            .addSelect("collections.url","url")
            .addSelect("collections.status","status")
            .addSelect("collections.coverPhoto","coverPhoto")
            .addSelect("collections.photos","photos")
            .addSelect("collections.videos","videos")
            .addSelect("collections.eventDate","eventDate")
            .addSelect("collections.createdAt","createdAt")
            .addSelect("collections.updatedAt","updatedAt")
            .where("collections.url = :url",{url:url})
            .andWhere("collections.status = :status",{status:CollectionStatus.PUBLISH})
            .getRawOne();
            const passwordCheckCollection = await collectionRepository.findOneBy({id:collection.id})
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found or collection not published", 404);
            }
            if(passwordCheckCollection.password){
                return this.collectionPasswordRequired(collection,passwordCheckCollection,password)
            }
            return ResponseBuilder.data({
                passwordRequired:false,
                ...collection
              });

        } catch (error) {
            throw ResponseBuilder.error(error)

        }
    }
    private collectionPasswordRequired = async(collection,passwordCheckCollection,password)=>{
      if(!password){
        return ResponseBuilder.data({passwordRequired:true,name:collection.name,coverPhoto:collection.coverPhoto,
        button:collection.button,accent:collection.accent,background:collection.background})
      }
      if(passwordCheckCollection.password !== password){
        return ResponseBuilder.badRequest("Wrong Password Provided")
      }
      return ResponseBuilder.data({
        passwordRequired:false,
        ...collection
      })
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