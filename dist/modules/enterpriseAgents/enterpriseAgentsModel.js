"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.BookAgent = exports.AgentFavourite = exports.AgentGetLocationList = exports.AgentGetList = void 0;
var class_validator_1 = require("class-validator");
var model_1 = require("../../helpers/model");
var assetRegistry_model_1 = require("../assetRegistry/assetRegistry.model");
var isFavourite;
(function (isFavourite) {
    isFavourite["zero"] = "0";
    isFavourite["one"] = "1";
})(isFavourite || (isFavourite = {}));
var SORT;
(function (SORT) {
    SORT["photograpyrate"] = "photograpyrate";
    SORT["videograpyrate"] = "videograpyrate";
    SORT["bothrate"] = "bothrate";
    SORT["distance"] = "distance";
    SORT["experiencelevel"] = "experiencelevel";
})(SORT || (SORT = {}));
var speciality;
(function (speciality) {
    speciality[speciality["photographer"] = 1] = "photographer";
    speciality[speciality["videographer"] = 2] = "videographer";
    speciality[speciality["both"] = 3] = "both";
})(speciality || (speciality = {}));
var AgentGetList = /** @class */ (function (_super) {
    __extends(AgentGetList, _super);
    function AgentGetList(body, params) {
        var _this = _super.call(this) || this;
        _this.latitude = params.latitude;
        _this.longitude = params.longitude;
        if (params.range) {
            _this.range = params.range;
        }
        else {
            _this.range = 45;
        }
        _this.page = params.page;
        _this.limit = params.limit;
        _this.speciality = Number(params.speciality);
        _this.category = Number(params.category);
        _this.sort = params.sort;
        _this.order = params.order;
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsLatitude)(),
        __metadata("design:type", String)
    ], AgentGetList.prototype, "latitude", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsLongitude)(),
        __metadata("design:type", String)
    ], AgentGetList.prototype, "longitude", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Number)
    ], AgentGetList.prototype, "range", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEnum)(speciality),
        __metadata("design:type", Number)
    ], AgentGetList.prototype, "speciality", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Number)
    ], AgentGetList.prototype, "category", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], AgentGetList.prototype, "page", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], AgentGetList.prototype, "limit", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEnum)(assetRegistry_model_1.OrderValidation),
        __metadata("design:type", String)
    ], AgentGetList.prototype, "order", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEnum)(SORT),
        __metadata("design:type", String)
    ], AgentGetList.prototype, "sort", void 0);
    return AgentGetList;
}(model_1.Model));
exports.AgentGetList = AgentGetList;
var AgentGetLocationList = /** @class */ (function (_super) {
    __extends(AgentGetLocationList, _super);
    function AgentGetLocationList(body, params) {
        var _this = _super.call(this) || this;
        _this.latitude = params.latitude;
        _this.longitude = params.longitude;
        if (params.range) {
            _this.range = params.range;
        }
        else {
            _this.range = 45;
        }
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsLatitude)(),
        __metadata("design:type", String)
    ], AgentGetLocationList.prototype, "latitude", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsLongitude)(),
        __metadata("design:type", String)
    ], AgentGetLocationList.prototype, "longitude", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Number)
    ], AgentGetLocationList.prototype, "range", void 0);
    return AgentGetLocationList;
}(model_1.Model));
exports.AgentGetLocationList = AgentGetLocationList;
var AgentFavourite = /** @class */ (function (_super) {
    __extends(AgentFavourite, _super);
    function AgentFavourite(body, params) {
        var _this = _super.call(this) || this;
        _this.isFavourite = params.isFavourite;
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEnum)(isFavourite),
        __metadata("design:type", String)
    ], AgentFavourite.prototype, "isFavourite", void 0);
    return AgentFavourite;
}(model_1.Model));
exports.AgentFavourite = AgentFavourite;
var BookAgent = /** @class */ (function (_super) {
    __extends(BookAgent, _super);
    function BookAgent(body, params) {
        var _this = _super.call(this) || this;
        _this.bookingDate = body.bookingDate;
        _this.bookingStartDateTime = body.bookingStartDateTime;
        _this.bookingEndDateTime = body.bookingEndDateTime;
        _this.address1 = body.address1;
        _this.latitude = body.latitude;
        _this.longitude = body.longitude;
        _this.speciality = body.speciality;
        _this.hours = body.hours;
        _this.categories = body.categories;
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Date)
    ], BookAgent.prototype, "bookingDate", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], BookAgent.prototype, "bookingStartDateTime", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], BookAgent.prototype, "bookingEndDateTime", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], BookAgent.prototype, "address1", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], BookAgent.prototype, "address2", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Array)
    ], BookAgent.prototype, "categories", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], BookAgent.prototype, "latitude", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], BookAgent.prototype, "longitude", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEnum)(speciality),
        __metadata("design:type", Number)
    ], BookAgent.prototype, "speciality", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], BookAgent.prototype, "hours", void 0);
    return BookAgent;
}(model_1.Model));
exports.BookAgent = BookAgent;
//# sourceMappingURL=enterpriseAgentsModel.js.map