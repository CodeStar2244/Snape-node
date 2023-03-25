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
Object.defineProperty(exports, "__esModule", { value: true });
exports.latestmigration1679749236884 = void 0;
var latestmigration1679749236884 = /** @class */ (function () {
    function latestmigration1679749236884() {
        this.name = 'latestmigration1679749236884';
    }
    latestmigration1679749236884.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblclient\" DROP CONSTRAINT \"tblclient_roleid_fkey\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tbluser\" DROP CONSTRAINT \"tbluser_roleid_fkey\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblagent\" DROP CONSTRAINT \"tblagent_roleid_fkey\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"assetCategory\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"colour\" character varying NOT NULL, \"createdAt\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT \"PK_67da675156ea02948cec188ecf8\" PRIMARY KEY (\"id\"))")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"public\".\"assets_status_enum\" AS ENUM('Active', 'For Sale', 'Lost', 'For Rent')")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"assets\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"imeiNumber\" character varying NOT NULL, \"price\" integer NOT NULL, \"status\" \"public\".\"assets_status_enum\" NOT NULL, \"createdAt\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"categoryId\" integer, CONSTRAINT \"PK_da96729a8b113377cfb6a62439c\" PRIMARY KEY (\"id\"))")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"collection_tags\" (\"id\" SERIAL NOT NULL, \"tag\" character varying NOT NULL, CONSTRAINT \"UQ_40bc0128c0f20bc05a4a6bb9fc0\" UNIQUE (\"tag\"), CONSTRAINT \"PK_4270e4bf7d00a8d776a0018b3ba\" PRIMARY KEY (\"id\"))")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"public\".\"collections_status_enum\" AS ENUM('PUBLISH', 'UNPUBLISH')")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"collections\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"eventDate\" TIMESTAMP NOT NULL, \"url\" character varying, \"status\" \"public\".\"collections_status_enum\" NOT NULL DEFAULT 'UNPUBLISH', \"socialSharing\" boolean NOT NULL DEFAULT false, \"password\" character varying, \"download\" boolean NOT NULL DEFAULT false, \"downloadPin\" character varying, \"photos\" integer DEFAULT '0', \"videos\" integer DEFAULT '0', \"coverPhoto\" character varying DEFAULT 'https://s3.amazonaws.com/dev-media.snape.com/collectionphoto.jpg', \"createdAt\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"agentId\" integer, CONSTRAINT \"UQ_362247ce86cafdeed16c44f9703\" UNIQUE (\"url\"), CONSTRAINT \"PK_21c00b1ebbd41ba1354242c5c4e\" PRIMARY KEY (\"id\"))")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"public\".\"files_type_enum\" AS ENUM('PHOTO', 'VIDEO')")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"files\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"url\" character varying NOT NULL, \"key\" character varying NOT NULL DEFAULT 'test', \"size\" integer NOT NULL, \"type\" \"public\".\"files_type_enum\" NOT NULL DEFAULT 'PHOTO', \"createdAt\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"collectionId\" integer, CONSTRAINT \"PK_6c16b9093a142e0e7613b04a3d9\" PRIMARY KEY (\"id\"))")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"collection_tag_join\" (\"collectionTagsId\" integer NOT NULL, \"collectionsId\" integer NOT NULL, CONSTRAINT \"PK_0040275e21869a2e0d24a2f59dc\" PRIMARY KEY (\"collectionTagsId\", \"collectionsId\"))")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_73ed095fdbb77d0a8c75874772\" ON \"collection_tag_join\" (\"collectionTagsId\") ")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_aa28a40c0a8547890d6971c554\" ON \"collection_tag_join\" (\"collectionsId\") ")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblagentmediacategoriesmapping\" ADD \"id\" SERIAL NOT NULL")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblagentmediacategoriesmapping\" ADD CONSTRAINT \"PK_66941e140038bd7c9b5f4c95991\" PRIMARY KEY (\"id\")")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblclient\" ALTER COLUMN \"roleid\" DROP NOT NULL")];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tbluser\" ALTER COLUMN \"roleid\" DROP NOT NULL")];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblagent\" ALTER COLUMN \"roleid\" DROP NOT NULL")];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"subtotal\" SET DEFAULT 0")];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"discount\" SET DEFAULT 0")];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"tax\" SET DEFAULT 0")];
                    case 22:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"totalamount\" SET DEFAULT 0")];
                    case 23:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"clientrating\" SET DEFAULT 0")];
                    case 24:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"agentrating\" SET DEFAULT 0")];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"cancellationfee\" SET DEFAULT 0")];
                    case 26:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"refundamount\" SET DEFAULT 0")];
                    case 27:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"transportationcharge\" SET DEFAULT 0")];
                    case 28:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"assets\" ADD CONSTRAINT \"FK_2e847f9d0120b4ca0d7269dda0e\" FOREIGN KEY (\"categoryId\") REFERENCES \"assetCategory\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 29:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblclient\" ADD CONSTRAINT \"FK_d710e68bf648a26bbed499394d3\" FOREIGN KEY (\"roleid\") REFERENCES \"tblrole\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 30:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tbluser\" ADD CONSTRAINT \"FK_b9133441a68d9da69bef9f2c751\" FOREIGN KEY (\"roleid\") REFERENCES \"tblrole\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 31:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblagent\" ADD CONSTRAINT \"FK_267afd38e46ffe5d04b56323db6\" FOREIGN KEY (\"roleid\") REFERENCES \"tblrole\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 32:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"collections\" ADD CONSTRAINT \"FK_c802e8ed2227a9b30594d3d0813\" FOREIGN KEY (\"agentId\") REFERENCES \"tblagent\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 33:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"files\" ADD CONSTRAINT \"FK_2b0a7280095e9f022cfaf56036e\" FOREIGN KEY (\"collectionId\") REFERENCES \"collections\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 34:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ADD CONSTRAINT \"FK_7d608dbbcc4648e07a68e35b38e\" FOREIGN KEY (\"clientid\") REFERENCES \"tblclient\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE")];
                    case 35:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"collection_tag_join\" ADD CONSTRAINT \"FK_73ed095fdbb77d0a8c758747723\" FOREIGN KEY (\"collectionTagsId\") REFERENCES \"collection_tags\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE")];
                    case 36:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"collection_tag_join\" ADD CONSTRAINT \"FK_aa28a40c0a8547890d6971c554c\" FOREIGN KEY (\"collectionsId\") REFERENCES \"collections\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE")];
                    case 37:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    latestmigration1679749236884.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"collection_tag_join\" DROP CONSTRAINT \"FK_aa28a40c0a8547890d6971c554c\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"collection_tag_join\" DROP CONSTRAINT \"FK_73ed095fdbb77d0a8c758747723\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" DROP CONSTRAINT \"FK_7d608dbbcc4648e07a68e35b38e\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"files\" DROP CONSTRAINT \"FK_2b0a7280095e9f022cfaf56036e\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"collections\" DROP CONSTRAINT \"FK_c802e8ed2227a9b30594d3d0813\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblagent\" DROP CONSTRAINT \"FK_267afd38e46ffe5d04b56323db6\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tbluser\" DROP CONSTRAINT \"FK_b9133441a68d9da69bef9f2c751\"")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblclient\" DROP CONSTRAINT \"FK_d710e68bf648a26bbed499394d3\"")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"assets\" DROP CONSTRAINT \"FK_2e847f9d0120b4ca0d7269dda0e\"")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"transportationcharge\" SET DEFAULT '0'")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"refundamount\" SET DEFAULT '0'")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"cancellationfee\" SET DEFAULT '0'")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"agentrating\" SET DEFAULT '0'")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"clientrating\" SET DEFAULT '0'")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"totalamount\" SET DEFAULT '0'")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"tax\" SET DEFAULT '0'")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"discount\" SET DEFAULT '0'")];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"subtotal\" SET DEFAULT '0'")];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblagent\" ALTER COLUMN \"roleid\" SET NOT NULL")];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tbluser\" ALTER COLUMN \"roleid\" SET NOT NULL")];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblclient\" ALTER COLUMN \"roleid\" SET NOT NULL")];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblagentmediacategoriesmapping\" DROP CONSTRAINT \"PK_66941e140038bd7c9b5f4c95991\"")];
                    case 22:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblagentmediacategoriesmapping\" DROP COLUMN \"id\"")];
                    case 23:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"public\".\"IDX_aa28a40c0a8547890d6971c554\"")];
                    case 24:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"public\".\"IDX_73ed095fdbb77d0a8c75874772\"")];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"collection_tag_join\"")];
                    case 26:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"files\"")];
                    case 27:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"public\".\"files_type_enum\"")];
                    case 28:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"collections\"")];
                    case 29:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"public\".\"collections_status_enum\"")];
                    case 30:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"collection_tags\"")];
                    case 31:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"assets\"")];
                    case 32:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"public\".\"assets_status_enum\"")];
                    case 33:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"assetCategory\"")];
                    case 34:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblagent\" ADD CONSTRAINT \"tblagent_roleid_fkey\" FOREIGN KEY (\"roleid\") REFERENCES \"tblrole\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 35:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tbluser\" ADD CONSTRAINT \"tbluser_roleid_fkey\" FOREIGN KEY (\"roleid\") REFERENCES \"tblrole\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 36:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblclient\" ADD CONSTRAINT \"tblclient_roleid_fkey\" FOREIGN KEY (\"roleid\") REFERENCES \"tblrole\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 37:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return latestmigration1679749236884;
}());
exports.latestmigration1679749236884 = latestmigration1679749236884;
//# sourceMappingURL=1679749236884-latestmigration.js.map