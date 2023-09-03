"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONT_URL = exports.CDN_URL = exports.FREE_ACCOUNT_STORAGE = exports.FILE_ALREADY_EXISTS = exports.PAYMENT_STATUS = exports.COLLECTION_STATUS = exports.RES_STATUS = exports.RES_CODE = exports.DATE_FORMAT_REPORT_DATE = exports.DATE_FORMAT_REPORT = exports.DATE_FORMAT = exports.IMAGE_EXT = exports.RECORDS_PER_PAGE = exports.TIME_FORMAT = exports.TIME_STAMP_FORMAT = exports.BAD_DATA = exports.CODE = exports.MESSAGE = void 0;
exports.MESSAGE = {
    TIMEZONE: "Asia/Kolkata",
    PASSWORD_SALT: 8,
};
exports.CODE = "CODE";
exports.BAD_DATA = "BAD_DATA";
exports.TIME_STAMP_FORMAT = "YYYY-MM-DD HH:mm:ss";
exports.TIME_FORMAT = "HH:mm:ss";
exports.RECORDS_PER_PAGE = 10;
exports.IMAGE_EXT = [".jpg", ".jpeg", ".png"];
exports.DATE_FORMAT = "YYYY-MM-DD";
exports.DATE_FORMAT_REPORT = "DD-MM-YYYY HH:mm";
exports.DATE_FORMAT_REPORT_DATE = "DD-MM-YYYY";
exports.RES_CODE = {
    error: {
        badRequest: 400,
        forbidden: 403,
        internalServerError: 500,
        notFound: 404,
        unauthorized: 401,
    },
    success: 200,
};
exports.RES_STATUS = {
    FAIL: "fail",
    SUCCESS: "success",
};
exports.COLLECTION_STATUS = {
    PUBLISH: "PUBLISH",
    UNPUBLISH: "UNPUBLISH",
};
exports.PAYMENT_STATUS = {
    SUCESS: "success",
};
exports.FILE_ALREADY_EXISTS = "File Already Exists";
exports.FREE_ACCOUNT_STORAGE = 3072;
exports.CDN_URL = "https://snape-buckets.b-cdn.net/";
exports.FRONT_URL = "http://snape-react-app.s3-website-us-east-1.amazonaws.com/view/";
//# sourceMappingURL=constants.js.map