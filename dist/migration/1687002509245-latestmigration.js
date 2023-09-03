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
exports.latestmigration1687002509245 = void 0;
var latestmigration1687002509245 = /** @class */ (function () {
    function latestmigration1687002509245() {
        this.name = "latestmigration1687002509245";
    }
    latestmigration1687002509245.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query('CREATE TABLE "enterprise_collection_tags" ("id" SERIAL NOT NULL, "tag" character varying NOT NULL, CONSTRAINT "UQ_71657be1483a1337e6b9e399708" UNIQUE ("tag"), CONSTRAINT "PK_138cea8e8e66661d2a796fe8fb7" PRIMARY KEY ("id"))')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"public\".\"enterprisecollections_status_enum\" AS ENUM('PUBLISH', 'HIDDEN')")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('CREATE TABLE "enterprisecollections" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "eventDate" TIMESTAMP NOT NULL, "url" character varying, "slug" character varying, "status" "public"."enterprisecollections_status_enum" NOT NULL DEFAULT \'HIDDEN\', "socialSharing" boolean NOT NULL DEFAULT false, "password" character varying, "download" boolean NOT NULL DEFAULT false, "downloadPin" character varying, "photos" integer DEFAULT \'0\', "videos" integer DEFAULT \'0\', "coverPhoto" character varying DEFAULT \'https://snape-buckets.b-cdn.net/collectionphoto.jpg\', "size" double precision DEFAULT \'0\', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "UQ_3f7642cbb2c12d42baba6de9570" UNIQUE ("url"), CONSTRAINT "UQ_e299ed162d740a7409766356a5f" UNIQUE ("slug"), CONSTRAINT "PK_a0ddfa3c83106e8c67560c15932" PRIMARY KEY ("id"))')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"public\".\"enterprise_collection_design_gridstyle_enum\" AS ENUM('column', 'row')")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"public\".\"enterprise_collection_design_gridspacing_enum\" AS ENUM('regular', 'large')")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('CREATE TABLE "enterprise_collection_design" ("id" SERIAL NOT NULL, "typography" character varying, "gridStyle" "public"."enterprise_collection_design_gridstyle_enum" NOT NULL DEFAULT \'column\', "gridSpacing" "public"."enterprise_collection_design_gridspacing_enum" NOT NULL DEFAULT \'regular\', "focusX" integer, "focusY" integer, "themeId" integer, "collectionId" integer, CONSTRAINT "REL_036930bcdea0c098ff5eb4cd83" UNIQUE ("collectionId"), CONSTRAINT "PK_f906c518f776d6ebda5aa428e13" PRIMARY KEY ("id"))')];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"public\".\"enterprisefiles_type_enum\" AS ENUM('PHOTO', 'VIDEO')")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('CREATE TABLE "enterprisefiles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "cdnUrl" character varying NOT NULL, "key" character varying NOT NULL, "size" double precision NOT NULL DEFAULT \'0\', "height" integer NOT NULL, "width" integer NOT NULL, "type" "public"."enterprisefiles_type_enum" NOT NULL DEFAULT \'PHOTO\', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "collectionId" integer, CONSTRAINT "PK_ee9eaa752a2dc1f6d0b02a832c0" PRIMARY KEY ("id"))')];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('CREATE TABLE "enterprisecollection_tag_join" ("enterpriseCollectionTagsId" integer NOT NULL, "enterprisecollectionsId" integer NOT NULL, CONSTRAINT "PK_a101f80df43c0ecc5bd078de627" PRIMARY KEY ("enterpriseCollectionTagsId", "enterprisecollectionsId"))')];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('CREATE INDEX "IDX_48e31b1754b6c639568d58f947" ON "enterprisecollection_tag_join" ("enterpriseCollectionTagsId") ')];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('CREATE INDEX "IDX_d73a1b78f98db149a9106ffb3d" ON "enterprisecollection_tag_join" ("enterprisecollectionsId") ')];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE "enterprisecollections" ADD CONSTRAINT "FK_781504ed37247ae114cc417a5b4" FOREIGN KEY ("clientId") REFERENCES "enterPriseClient"("id") ON DELETE CASCADE ON UPDATE NO ACTION')];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE "enterprise_collection_design" ADD CONSTRAINT "FK_98117665453847130b27cef5804" FOREIGN KEY ("themeId") REFERENCES "collection_themes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE "enterprise_collection_design" ADD CONSTRAINT "FK_036930bcdea0c098ff5eb4cd83b" FOREIGN KEY ("collectionId") REFERENCES "enterprisecollections"("id") ON DELETE CASCADE ON UPDATE NO ACTION')];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE "enterprisefiles" ADD CONSTRAINT "FK_6da693d17dee775aea3121316e1" FOREIGN KEY ("collectionId") REFERENCES "enterprisecollections"("id") ON DELETE CASCADE ON UPDATE NO ACTION')];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE "enterprisecollection_tag_join" ADD CONSTRAINT "FK_48e31b1754b6c639568d58f9474" FOREIGN KEY ("enterpriseCollectionTagsId") REFERENCES "enterprise_collection_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE')];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE "enterprisecollection_tag_join" ADD CONSTRAINT "FK_d73a1b78f98db149a9106ffb3da" FOREIGN KEY ("enterprisecollectionsId") REFERENCES "enterprisecollections"("id") ON DELETE CASCADE ON UPDATE CASCADE')];
                    case 17:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    latestmigration1687002509245.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query('ALTER TABLE "enterprisecollection_tag_join" DROP CONSTRAINT "FK_d73a1b78f98db149a9106ffb3da"')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE "enterprisecollection_tag_join" DROP CONSTRAINT "FK_48e31b1754b6c639568d58f9474"')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE "enterprisefiles" DROP CONSTRAINT "FK_6da693d17dee775aea3121316e1"')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE "enterprise_collection_design" DROP CONSTRAINT "FK_036930bcdea0c098ff5eb4cd83b"')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE "enterprise_collection_design" DROP CONSTRAINT "FK_98117665453847130b27cef5804"')];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE "enterprisecollections" DROP CONSTRAINT "FK_781504ed37247ae114cc417a5b4"')];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('DROP INDEX "public"."IDX_d73a1b78f98db149a9106ffb3d"')];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('DROP INDEX "public"."IDX_48e31b1754b6c639568d58f947"')];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('DROP TABLE "enterprisecollection_tag_join"')];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('DROP TABLE "enterprisefiles"')];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('DROP TYPE "public"."enterprisefiles_type_enum"')];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('DROP TABLE "enterprise_collection_design"')];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('DROP TYPE "public"."enterprise_collection_design_gridspacing_enum"')];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('DROP TYPE "public"."enterprise_collection_design_gridstyle_enum"')];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('DROP TABLE "enterprisecollections"')];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('DROP TYPE "public"."enterprisecollections_status_enum"')];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query('DROP TABLE "enterprise_collection_tags"')];
                    case 17:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return latestmigration1687002509245;
}());
exports.latestmigration1687002509245 = latestmigration1687002509245;
//# sourceMappingURL=1687002509245-latestmigration.js.map