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
exports.AgentFavourite = exports.AgentGetLocationList = exports.AgentGetList = void 0;
var class_validator_1 = require("class-validator");
var model_1 = require("../../helpers/model");
var isFavourite;
(function (isFavourite) {
    isFavourite["zero"] = "0";
    isFavourite["one"] = "1";
})(isFavourite || (isFavourite = {}));
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
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], AgentGetList.prototype, "page", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], AgentGetList.prototype, "limit", void 0);
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
//# sourceMappingURL=enterpriseAgentsModel.js.map