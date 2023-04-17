import AWS from 'aws-sdk';
import dotenv from 'dotenv'
import s3Zip  from 's3-zip';

dotenv.config();
const awsObj = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
}
AWS.config.update(awsObj);
export class AWSS3 {
     private s3: AWS.S3 = new AWS.S3({
        endpoint:"https://s3.wasabisys.com",
        httpOptions: {
            connectTimeout: 500000,
            timeout: 1200000
        },
     });
    public deleteS3File = (key) => {
        try {
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key

            }
            this.s3.deleteObject(params, function (err, data) {
                if (err) console.log(err);
                else console.log(data);
            });

        }
        catch (error) {
        

        }
    }
    public getS3File = async (key) => {
        try {
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key

            }
             const data = (await (this.s3.getObject(params))).createReadStream();
             return data;
        }
        catch (error) {
          console.log(error , "error in readstreammm")

        }
    }
    public getZipStream = (collection,files)=>{
        try {
            return s3Zip
            .archive({ s3: this.s3, bucket: process.env.S3_BUCKET_NAME }, collection, files);
        } catch (error) {
            console.log(error , "Err")
        }

    }

}