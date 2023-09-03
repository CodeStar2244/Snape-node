"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileType = void 0;
var typeorm_1 = require("typeorm");
var Portfolio_1 = __importDefault(require("./Portfolio"));
var FileType;
(function (FileType) {
    FileType["PHOTO"] = "PHOTO";
    FileType["VIDEO"] = "VIDEO";
})(FileType = exports.FileType || (exports.FileType = {}));
var PortFolioFiles = /** @class */ (function () {
    function PortFolioFiles() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PortFolioFiles.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PortFolioFiles.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PortFolioFiles.prototype, "url", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PortFolioFiles.prototype, "cdnUrl", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], PortFolioFiles.prototype, "compressedKey", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], PortFolioFiles.prototype, "compressedCdnUrl", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: "float", default: 0 }),
        __metadata("design:type", Number)
    ], PortFolioFiles.prototype, "compressedImageSize", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PortFolioFiles.prototype, "key", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "float",
            default: 0,
        }),
        __metadata("design:type", Number)
    ], PortFolioFiles.prototype, "size", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], PortFolioFiles.prototype, "height", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], PortFolioFiles.prototype, "width", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: FileType,
            default: FileType.PHOTO,
        }),
        __metadata("design:type", String)
    ], PortFolioFiles.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Portfolio_1.default; }, function (portfolio) { return portfolio.id; }, {
            onDelete: "CASCADE",
        }),
        __metadata("design:type", Portfolio_1.default)
    ], PortFolioFiles.prototype, "portfolio", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], PortFolioFiles.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], PortFolioFiles.prototype, "updatedAt", void 0);
    PortFolioFiles = __decorate([
        (0, typeorm_1.Entity)("portfolioFiles", { schema: "public" })
    ], PortFolioFiles);
    return PortFolioFiles;
}());
exports.default = PortFolioFiles;
//# sourceMappingURL=portfolioFiles.js.map