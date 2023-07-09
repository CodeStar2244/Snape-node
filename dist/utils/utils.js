"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var db_config_1 = require("../db/db.config");
var Files_1 = __importDefault(require("../entities/Files"));
var awss3_1 = require("../helpers/awss3");
var sharp = require('sharp');
var constants_1 = require("../config/constants");
var Utils = /** @class */ (function () {
    function Utils() {
        this.s3 = new awss3_1.AWSS3();
    }
    Utils.prototype.compressImage = function (path, collectionId) {
        return __awaiter(this, void 0, void 0, function () {
            var imageName, key, image, imageBuffer, compressedImageBuffer, fileSizeInBytes, fileSize, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        imageName = path.split("/")[1];
                        key = collectionId + "/compressed/" + imageName;
                        return [4 /*yield*/, this.s3.getS3FileBuffer(path)];
                    case 1:
                        image = _a.sent();
                        imageBuffer = image.Body;
                        return [4 /*yield*/, sharp(imageBuffer)
                                .jpeg({ quality: 80 }) // Compress the image with desired quality (80% in this example)
                                .toBuffer()];
                    case 2:
                        compressedImageBuffer = _a.sent();
                        fileSizeInBytes = compressedImageBuffer.byteLength;
                        fileSize = fileSizeInBytes / (1024 * 1024);
                        console.log(fileSize, "fileSizeMB");
                        return [4 /*yield*/, this.s3.putS3File(compressedImageBuffer, key)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, { key: key, fileSize: fileSize }];
                    case 4:
                        error_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.compressAllImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileRepo, files, _i, files_1, file, compressedKey, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        fileRepo = db_config_1.AppDataSource.getRepository(Files_1.default);
                        return [4 /*yield*/, fileRepo.createQueryBuilder("files")
                                .select("files.id", "id")
                                .addSelect("files.key", "key")
                                .addSelect("files.size", "size")
                                .addSelect("files.collectionId", "collectionId")
                                .where("files.compressedKey IS NULL").getRawMany()];
                    case 1:
                        files = _a.sent();
                        _i = 0, files_1 = files;
                        _a.label = 2;
                    case 2:
                        if (!(_i < files_1.length)) return [3 /*break*/, 6];
                        file = files_1[_i];
                        console.log("Compressing..", file.id);
                        return [4 /*yield*/, this.compressImage(file.key, file.collectionId)];
                    case 3:
                        compressedKey = _a.sent();
                        console.log(compressedKey);
                        console.log("Converted from ".concat(file.size, " to ").concat(compressedKey.fileSize));
                        return [4 /*yield*/, fileRepo.update({ id: file.id }, { compressedKey: compressedKey.key, compressedImageSize: compressedKey.fileSize, compressedCdnUrl: constants_1.CDN_URL + compressedKey.key })];
                    case 4:
                        _a.sent();
                        console.log("Updated File", file.id);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.updateCompressedCdnurl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileRepo, files, _i, files_2, file, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        fileRepo = db_config_1.AppDataSource.getRepository(Files_1.default);
                        return [4 /*yield*/, fileRepo.createQueryBuilder("files")
                                .select("files.id", "id")
                                .addSelect("files.key", "key")
                                .addSelect("files.compressedKey", "compressedKey")
                                .addSelect("files.compressedCdnUrl", "compressedCdnUrl")
                                .addSelect("files.size", "size")
                                .addSelect("files.collectionId", "collectionId").getRawMany()];
                    case 1:
                        files = _a.sent();
                        console.log(files);
                        _i = 0, files_2 = files;
                        _a.label = 2;
                    case 2:
                        if (!(_i < files_2.length)) return [3 /*break*/, 5];
                        file = files_2[_i];
                        console.log("updating", file.id);
                        return [4 /*yield*/, fileRepo.update({ id: file.id }, { compressedCdnUrl: constants_1.CDN_URL + file.compressedKey })];
                    case 3:
                        _a.sent();
                        console.log("Updated File", file.id);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map