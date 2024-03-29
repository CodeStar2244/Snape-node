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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionStatus = void 0;
var typeorm_1 = require("typeorm");
var enterPriseClient_1 = require("./enterPriseClient");
var enterpriseCollectionTags_1 = require("./enterpriseCollectionTags");
var CollectionStatus;
(function (CollectionStatus) {
    CollectionStatus["PUBLISH"] = "PUBLISH";
    CollectionStatus["HIDDEN"] = "HIDDEN";
})(CollectionStatus = exports.CollectionStatus || (exports.CollectionStatus = {}));
var EnterpriseCollections = /** @class */ (function () {
    function EnterpriseCollections() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], EnterpriseCollections.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], EnterpriseCollections.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], EnterpriseCollections.prototype, "eventDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true, nullable: true }),
        __metadata("design:type", String)
    ], EnterpriseCollections.prototype, "url", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true, nullable: true }),
        __metadata("design:type", String)
    ], EnterpriseCollections.prototype, "slug", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: CollectionStatus,
            default: CollectionStatus.HIDDEN,
        }),
        __metadata("design:type", String)
    ], EnterpriseCollections.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return enterpriseCollectionTags_1.EnterpriseCollectionTags; }, function (tags) { return tags.id; }, {
            cascade: true,
        }),
        (0, typeorm_1.JoinTable)({ name: "enterprisecollection_tag_join" }),
        __metadata("design:type", Array)
    ], EnterpriseCollections.prototype, "tags", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], EnterpriseCollections.prototype, "socialSharing", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], EnterpriseCollections.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], EnterpriseCollections.prototype, "download", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], EnterpriseCollections.prototype, "downloadPin", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, default: 0 }),
        __metadata("design:type", Number)
    ], EnterpriseCollections.prototype, "photos", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, default: 0 }),
        __metadata("design:type", Number)
    ], EnterpriseCollections.prototype, "videos", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            default: "https://snape-buckets.b-cdn.net/collectionphoto.jpg",
        }),
        __metadata("design:type", String)
    ], EnterpriseCollections.prototype, "coverPhoto", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "float",
            default: 0,
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], EnterpriseCollections.prototype, "size", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return enterPriseClient_1.EnterPriseClient; }, function (client) { return client.id; }, {
            onDelete: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)({ name: "clientId" }),
        __metadata("design:type", enterPriseClient_1.EnterPriseClient)
    ], EnterpriseCollections.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], EnterpriseCollections.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], EnterpriseCollections.prototype, "updatedAt", void 0);
    EnterpriseCollections = __decorate([
        (0, typeorm_1.Entity)("enterprisecollections", { schema: "public" })
    ], EnterpriseCollections);
    return EnterpriseCollections;
}());
exports.default = EnterpriseCollections;
//# sourceMappingURL=enterpriseCollections.js.map