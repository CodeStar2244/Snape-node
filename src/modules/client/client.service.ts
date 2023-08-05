import { In } from "typeorm";
import { AppDataSource } from "../../db/db.config";
import Collections, { CollectionStatus } from "../../entities/Collection"
import { CollectionDesign } from "../../entities/collectionDesign";
import { CollectionTags } from "../../entities/CollectionTags";
import FilesEntity from "../../entities/Files";
import { AWSS3 } from "../../helpers/awss3";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import mime from 'mime';
export class ClientService {
    private s3 = new AWSS3();
    public getCollectionByUrl = async ({url,password}) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const filesRepository = AppDataSource.getRepository(FilesEntity);
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
            .addSelect("collections.url","url")
            .addSelect("collections.status","status")
            .addSelect("collections.coverPhoto","coverPhoto")
            .addSelect("collections.photos","photos")
            .addSelect("collections.videos","videos")
            .addSelect("collections.eventDate","eventDate")
            .addSelect("collections.createdAt","createdAt")
            .addSelect("collections.updatedAt","updatedAt")
            .where("collections.slug = :slug",{slug:url})
            .andWhere("collections.status = :status",{status:CollectionStatus.PUBLISH})
            .getRawOne();
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found or collection not published", 404);
            }
            const filesCollection = await filesRepository.createQueryBuilder("files")
            .select("files.compressedCdnUrl","url")
            .addSelect("files.name","name")
            .addSelect("files.size","size")
            .addSelect("files.id","id")
            .addSelect("files.key","key")
            .addSelect("files.url","prevUrl")
            .addSelect("files.height","height")
            .addSelect("files.width","width")
            .addSelect("files.collectionId","collectionId")
            .where("files.collectionId = :collectionId",{collectionId:collection.id}).getRawMany();
            const passwordCheckCollection = await collectionRepository.findOneBy({id:collection.id})
            
            if(passwordCheckCollection.password){
                return this.collectionPasswordRequired(collection,passwordCheckCollection,password,filesCollection)
            }
            return ResponseBuilder.data({
                passwordRequired:false,
                ...collection,
                files:filesCollection
              });

        } catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }
    }
    private collectionPasswordRequired = async(collection,passwordCheckCollection,password,filesCollection)=>{
      if(!password){
        return ResponseBuilder.data({passwordRequired:true,name:collection.name,coverPhoto:collection.coverPhoto,
        button:collection.button,accent:collection.accent,background:collection.background})
      }
      if(passwordCheckCollection.password !== password){
        return ResponseBuilder.badRequest("Wrong Password Provided")
      }
      return ResponseBuilder.data({
        passwordRequired:false,
        ...collection,
        files:filesCollection
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
    public downloadFile = async (userDetails, id,{pin},res) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const fileRepo = AppDataSource.getRepository(FilesEntity)
            const file = await fileRepo.findOne({
                where:{
                    id
                },
                relations:["collection"]
            });
            const collection = await collectionRepository.findOneBy({ id: file.collection.id })
            if (!collection) {
                return ResponseBuilder.badRequest("File Not Found", 404);
            }
            if(!collection.download){
                return ResponseBuilder.badRequest("Downlaod Not allowed for these collection");
            }
            if(collection.downloadPin){
                return this.collectionFileDownloadPinRequired(collection,pin,file,res)
            }else{
                const fileStream = await this.getFileFromS3Bucket(file.key);
                const fileMime = mime.getType(file.url);
                return {
                    result:fileStream,
                    name:file.name,
                    mime:fileMime
                };
            }
        } catch (error) {
            console.log(error, "er")
            throw ResponseBuilder.error(error)

        }



    }
    public downloadCollection = async (userDetails, id,{pin},res) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const fileRepo = AppDataSource.getRepository(FilesEntity)
            const files = await fileRepo.find({
                where:{
                    collection:{
                        id
                    }
                },
                relations:["collection"]
            });
            const collection = await collectionRepository.findOneBy({ id})
            if (!collection) {
                return ResponseBuilder.badRequest("File Not Found", 404);
            }
            if(!collection.download){
                return ResponseBuilder.badRequest("Downlaod Not allowed for these collection");
            }
            if(collection.downloadPin){
                return this.collectionDownloadPinRequired(collection,pin,files,res)
            }else{
                return {
                    zipFile:await this.createZipfile(collection.id,files),
                    name:collection.name
                }
            }
        } catch (error) {
            console.log(error, "er")
            throw ResponseBuilder.error(error)

        }



    }
    public downloadPinCheck = async (userDetails, id,{pin},res) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const fileRepo = AppDataSource.getRepository(FilesEntity)
            const files = await fileRepo.find({
                where:{
                    collection:{
                        id
                    }
                },
                relations:["collection"]
            });
            const collection = await collectionRepository.findOneBy({ id});
            if (!collection) {
                return ResponseBuilder.badRequest("Collection Not Found", 404);
            }
            if(!collection.download){
                return ResponseBuilder.badRequest("Downlaod Not allowed for these collection");
            }
            if(collection.downloadPin){
                return ResponseBuilder.data({donwloadPinRequired:true});
            }else{
                return ResponseBuilder.data({donwloadPinRequired:false});
            }
        } catch (error) {
            console.log(error, "er")
            throw ResponseBuilder.error(error)

        }



    }
    public downloadFilePinCheck = async (userDetails, id,{pin},res) => {
        try {
            const collectionRepository = AppDataSource.getRepository(Collections);
            const fileRepo = AppDataSource.getRepository(FilesEntity)
            const file = await fileRepo.findOne({
                where:{
                    id
                },
                relations:["collection"]
            });
            const collection = await collectionRepository.findOneBy({ id: file.collection.id })
            if (!collection) {
                return ResponseBuilder.badRequest("File Not Found", 404);
            }
            if(!collection.download){
                return ResponseBuilder.badRequest("Downlaod Not allowed for these collection");
            }
            if(collection.downloadPin){
                return ResponseBuilder.data({donwloadPinRequired:true});
            }else{
                return ResponseBuilder.data({donwloadPinRequired:false});
            }
        } catch (error) {
            console.log(error, "er")
            throw ResponseBuilder.error(error)

        }



    }


    private collectionDownloadPinRequired = async(collection,pin,files,res)=>{
        if(!pin){
          return ResponseBuilder.badRequest("Please Provide DownloadPin")
        }
        if(collection.downloadPin !== pin){
          return ResponseBuilder.badRequest("Wrong Pin Provided")
        }
        return {
            zipFile:await this.createZipfile(collection.id,files),
            name:collection.name
        } 
    }
    private async createZipfile(collection,files){
    const filesName = files.map((file)=>file.name);
     return this.s3.getZipStream(collection.toString(),filesName)
    }
    private collectionFileDownloadPinRequired = async(collection,pin,file,res)=>{
        if(!pin){
          return ResponseBuilder.badRequest("Please Provide DownloadPin")
        }
        if(collection.downloadPin !== pin){
          return ResponseBuilder.badRequest("Wrong Pin Provided")
        }
        const fileFromS3 = await this.getFileFromS3Bucket(file.key);
        const fileMime = mime.getType(file.url);
        return {
            result:fileFromS3,
            name:file.name,
            mime:fileMime
        };
    }

    private async getFileFromS3Bucket(key){
       try {
        return  this.s3.getS3File(key);
       } catch (error) {
        throw error;
       }
    }

}