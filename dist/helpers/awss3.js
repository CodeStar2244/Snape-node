"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSS3 = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var awsObj = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
};
aws_sdk_1.default.config.update(awsObj);
var AWSS3 = /** @class */ (function () {
    function AWSS3() {
        var _this = this;
        this.s3 = new aws_sdk_1.default.S3();
        this.deleteS3File = function (key) {
            try {
                var params = {
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: key
                };
                _this.s3.deleteObject(params, function (err, data) {
                    if (err)
                        console.log(err);
                    else
                        console.log(data);
                });
            }
            catch (error) {
            }
        };
    }
    return AWSS3;
}());
exports.AWSS3 = AWSS3;
//# sourceMappingURL=awss3.js.map