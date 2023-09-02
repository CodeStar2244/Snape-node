'use strict';
var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), 'throw': verb(1), 'return': verb(2) }, typeof Symbol === 'function' && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.');
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
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
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.EnterpriseAssetRegistryService = void 0;
var db_config_1 = require('../../db/db.config');
var enterpriseAssets_1 = __importDefault(require('../../entities/enterpriseAssets'));
var enterpriseSettings_1 = __importDefault(require('../../entities/enterpriseSettings'));
var responseBuilder_1 = require('../../helpers/responseBuilder');
var enterpriseAssetRegistry_model_1 = require('./enterpriseAssetRegistry.model');
var EnterpriseAssetRegistryService = /** @class */ (function () {
  function EnterpriseAssetRegistryService() {
    var _this = this;
    this.createAsset = function (body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
      var assetRepo, asset;
      return __generator(this, function (_a) {
        try {
          assetRepo = db_config_1.AppDataSource.getRepository(enterpriseAssets_1.default);
          asset = assetRepo.create({
            nickName: body.nickName,
            deviceAmount: body.deviceAmount,
            deviceID: body.deviceID,
            type: body.type,
            clientId: userDetails.id,
          });
          assetRepo.save(asset);
          return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(asset)];
        }
        catch (error) {
          console.log(error);
          throw responseBuilder_1.ResponseBuilder.error(error);
        }
        return [2 /*return*/];
      });
    }); };
    this.getAssets = function (userDetails, params) { return __awaiter(_this, void 0, void 0, function () {
      var search, sort, order, status_1, assetRepo, assetsquery, assets, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          search = params.search, sort = params.sort, order = params.order, status_1 = params.status;
          assetRepo = db_config_1.AppDataSource.getRepository(enterpriseAssets_1.default);
          assetsquery = assetRepo
            .createQueryBuilder('assets')
            .where('"assets"."clientId" = :clientId', { clientId: userDetails.id });
          if (status_1) {
            assetsquery.andWhere('assets.status =:status', {
              status: params.status,
            });
          }
          if (search) {
            assetsquery.andWhere('assets.nickName ILIKE :name', {
              name: '%'.concat(search, '%'),
            });
          }
          if (sort && order) {
            assetsquery.addOrderBy('assets.'.concat(sort), order.toUpperCase());
          }
          return [4 /*yield*/, assetsquery.getMany()];
        case 1:
          assets = _a.sent();
          return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(assets)];
        case 2:
          error_1 = _a.sent();
          console.log(error_1);
          throw responseBuilder_1.ResponseBuilder.error(error_1);
        case 3: return [2 /*return*/];
        }
      });
    }); };
    this.assetDashboard = function (userDetails) { return __awaiter(_this, void 0, void 0, function () {
      var assetRepo, agentSettingRepo, assetsCount, totalDevices, assetGroupByStatusQuery, assetGroupByTypeQuery, getAssetAmountsPromise, _a, assetGroupByStatus, assetGroupByType, getAssetAmounts, summaryInfo, categoryInfo, activeObj, saleObj, lostObj, rentObj, cameraObj, screenObj, cellPhoneObj, printerObj, error_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          assetRepo = db_config_1.AppDataSource.getRepository(enterpriseAssets_1.default);
          agentSettingRepo = db_config_1.AppDataSource.getRepository(enterpriseSettings_1.default);
          return [4 /*yield*/, assetRepo
            .createQueryBuilder('assets')
            .select('count("assets"."id")', 'devices')
            .where('"assets"."clientId" = :clientId', { clientId: userDetails.id })
            .getRawOne()];
        case 1:
          assetsCount = _b.sent();
          totalDevices = +assetsCount.devices;
          assetGroupByStatusQuery = assetRepo
            .createQueryBuilder('assets')
            .select('count("assets"."id")', 'devices')
            .addSelect('assets.status', 'status')
            .where('"assets"."clientId" = :clientId', { clientId: userDetails.id })
            .addGroupBy('assets.status');
          assetGroupByTypeQuery = assetRepo
            .createQueryBuilder('assets')
            .select('round(count("assets"."id")::decimal * 100 / '.concat(totalDevices, ',2)'), 'devices')
            .addSelect('assets.type', 'type')
            .where('"assets"."clientId" = :clientId', { clientId: userDetails.id })
            .addGroupBy('assets.type');
          getAssetAmountsPromise = agentSettingRepo.findOne({
            where: {
              clientId: {
                id: userDetails.id,
              },
            },
          });
          return [4 /*yield*/, Promise.all([
            assetGroupByStatusQuery.getRawMany(),
            assetGroupByTypeQuery.getRawMany(),
            getAssetAmountsPromise,
          ])];
        case 2:
          _a = _b.sent(), assetGroupByStatus = _a[0], assetGroupByType = _a[1], getAssetAmounts = _a[2];
          summaryInfo = {
            active: 0,
            sale: 0,
            lost: 0,
            rent: 0,
          };
          categoryInfo = {
            camera: 0,
            screen: 0,
            cell_phone: 0,
            printer: 0,
          };
          activeObj = assetGroupByStatus.find(function (obj) { return obj.status === 'Active'; });
          summaryInfo.active = (activeObj === null || activeObj === void 0 ? void 0 : activeObj.devices) ? activeObj === null || activeObj === void 0 ? void 0 : activeObj.devices : '0';
          saleObj = assetGroupByStatus.find(function (obj) { return obj.status === 'For Sale'; });
          summaryInfo.sale = (saleObj === null || saleObj === void 0 ? void 0 : saleObj.devices) ? saleObj === null || saleObj === void 0 ? void 0 : saleObj.devices : '0';
          lostObj = assetGroupByStatus.find(function (obj) { return obj.status === 'Lost'; });
          summaryInfo.lost = (lostObj === null || lostObj === void 0 ? void 0 : lostObj.devices) ? lostObj === null || lostObj === void 0 ? void 0 : lostObj.devices : '0';
          rentObj = assetGroupByStatus.find(function (obj) { return obj.status === 'For Rent'; });
          summaryInfo.rent = (rentObj === null || rentObj === void 0 ? void 0 : rentObj.devices) ? rentObj === null || rentObj === void 0 ? void 0 : rentObj.devices : '0';
          cameraObj = assetGroupByType.find(function (obj) { return obj.type === 'CAMERA'; });
          categoryInfo.camera = (cameraObj === null || cameraObj === void 0 ? void 0 : cameraObj.devices) ? cameraObj === null || cameraObj === void 0 ? void 0 : cameraObj.devices : '0';
          screenObj = assetGroupByType.find(function (obj) { return obj.type === 'SCREEN'; });
          categoryInfo.screen = (screenObj === null || screenObj === void 0 ? void 0 : screenObj.devices) ? screenObj === null || screenObj === void 0 ? void 0 : screenObj.devices : '0';
          cellPhoneObj = assetGroupByType.find(function (obj) { return obj.type === 'CELL_PHONE'; });
          categoryInfo.cell_phone = (cellPhoneObj === null || cellPhoneObj === void 0 ? void 0 : cellPhoneObj.devices)
            ? cellPhoneObj === null || cellPhoneObj === void 0 ? void 0 : cellPhoneObj.devices
            : '0';
          printerObj = assetGroupByType.find(function (obj) { return obj.type === 'PRINTER'; });
          categoryInfo.printer = (printerObj === null || printerObj === void 0 ? void 0 : printerObj.devices) ? printerObj === null || printerObj === void 0 ? void 0 : printerObj.devices : '0';
          return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
            summary: summaryInfo,
            categoryData: categoryInfo,
            totalAssetAmount: getAssetAmounts.assets,
          })];
        case 3:
          error_2 = _b.sent();
          console.log(error_2);
          throw responseBuilder_1.ResponseBuilder.error(error_2);
        case 4: return [2 /*return*/];
        }
      });
    }); };
    this.updateAsset = function (userDetails, params, body) { return __awaiter(_this, void 0, void 0, function () {
      var assetRepo, assetsquery, asset, _a, nickName, deviceAmount, deviceID, status_2, type, updateObject, updatedAsset, error_3;
      return __generator(this, function (_b) {
        switch (_b.label) {
        case 0:
          _b.trys.push([0, 4, , 5]);
          assetRepo = db_config_1.AppDataSource.getRepository(enterpriseAssets_1.default);
          assetsquery = assetRepo
            .createQueryBuilder('assets')
            .where('"assets"."clientId" = :clientId', { clientId: userDetails.id })
            .andWhere('"assets"."id" = :id', { id: params.id });
          return [4 /*yield*/, assetsquery.getOne()];
        case 1:
          asset = _b.sent();
          if (!asset) {
            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest('Asset Not found', 404)];
          }
          _a = new enterpriseAssetRegistry_model_1.AssetUpdateModel(body), nickName = _a.nickName, deviceAmount = _a.deviceAmount, deviceID = _a.deviceID, status_2 = _a.status, type = _a.type;
          updateObject = {
            nickName: nickName,
            deviceAmount: deviceAmount,
            deviceID: deviceID,
            status: status_2,
            type: type,
          };
          return [4 /*yield*/, assetRepo.save(__assign(__assign({}, asset), updateObject))];
        case 2:
          _b.sent();
          return [4 /*yield*/, assetsquery.getOne()];
        case 3:
          updatedAsset = _b.sent();
          return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(updatedAsset)];
        case 4:
          error_3 = _b.sent();
          console.log(error_3);
          throw responseBuilder_1.ResponseBuilder.error(error_3);
        case 5: return [2 /*return*/];
        }
      });
    }); };
  }
  return EnterpriseAssetRegistryService;
}());
exports.EnterpriseAssetRegistryService = EnterpriseAssetRegistryService;
//# sourceMappingURL=enterpriseAssetRegistry.service.js.map