import { AppDataSource } from "../db/db.config";
import FilesEntity from "../entities/Files";
import { AWSS3 } from "../helpers/awss3";
const sharp = require('sharp');
import fs from 'fs';
import { Failure } from "../helpers/error";
import { CDN_URL } from "../config/constants";
export class Utils {
    private s3 = new AWSS3();
 public async compressImage(path:string,collectionId){
    try {
        const imageName = path.split("/")[1];
        const key = collectionId + "/compressed/" + imageName;
        const image = await this.s3.getS3FileBuffer(path);
        const imageBuffer = image.Body;
        const compressedImageBuffer = await sharp(imageBuffer)
    .jpeg({ quality: 80 }) // Compress the image with desired quality (80% in this example)
    .toBuffer();

    const fileSizeInBytes = compressedImageBuffer.byteLength;
    const fileSize = fileSizeInBytes / (1024 * 1024); 
        const result = await this.s3.putS3File(compressedImageBuffer,key);
    return {key , fileSize};         
    } catch (error) {
        
    }

 }

 public async compressPortfolioImage(path:string,collectionId){
    try {
        const key = path;
        const image = await this.s3.getS3FileBuffer(path);
        const imageBuffer = image.Body;
        const compressedImageBuffer = await sharp(imageBuffer)
    .jpeg({ quality: 80 }) // Compress the image with desired quality (80% in this example)
    .toBuffer();

    const fileSizeInBytes = compressedImageBuffer.byteLength;
    const fileSize = fileSizeInBytes / (1024 * 1024); 
        const result = await this.s3.putS3File(compressedImageBuffer,key);
    return {key , fileSize};         
    } catch (error) {
        
    }

 }

 public async compressAllImages(){
    try {
        const fileRepo = AppDataSource.getRepository(FilesEntity);
        const files = await fileRepo.createQueryBuilder("files")
        .select("files.id","id")
        .addSelect("files.key","key")
        .addSelect("files.size","size")
        .addSelect("files.collectionId","collectionId")
        .where("files.compressedKey IS NULL").getRawMany();
        for(const file of files){
            const compressedKey = await this.compressImage(file.key , file.collectionId);
           await fileRepo.update({id:file.id},{compressedKey:compressedKey.key , compressedImageSize:compressedKey.fileSize ,compressedCdnUrl : CDN_URL + compressedKey.key})



        }
        
    } catch (error) {
        console.log(error)
    }
 }

 public async updateCompressedCdnurl(){
    try {
        const fileRepo = AppDataSource.getRepository(FilesEntity);
        const files = await fileRepo.createQueryBuilder("files")
        .select("files.id","id")
        .addSelect("files.key","key")
        .addSelect("files.compressedKey","compressedKey")
        .addSelect("files.compressedCdnUrl","compressedCdnUrl")
        .addSelect("files.size","size")
        .addSelect("files.collectionId","collectionId").getRawMany();
        for(const file of files){
            await fileRepo.update({id:file.id},{compressedCdnUrl : CDN_URL + file.compressedKey})
        }
        
    } catch (error) {
        console.log(error)
    }
 }
 
}