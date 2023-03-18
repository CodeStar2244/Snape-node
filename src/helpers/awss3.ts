import AWS from 'aws-sdk';
import dotenv from 'dotenv'
dotenv.config();
const awsObj = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
}
AWS.config.update(awsObj);
export class AWSS3 {
     private s3: AWS.S3 = new AWS.S3();
    public deleteS3File = (key) => {
        try {
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key

            }
            console.log(params , 'df')
            this.s3.deleteObject(params, function (err, data) {
                if (err) console.log(err);
                else console.log(data);
            });

        }
        catch (error) {
        

        }
    }
}