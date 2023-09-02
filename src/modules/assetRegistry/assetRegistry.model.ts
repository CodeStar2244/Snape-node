import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Model } from "../../helpers/model";

export enum AssetType {
  CELL_PHONE = "CELL_PHONE",
  CAMERA = "CAMERA",
  SCREEN = "SCREEN",
  PRINTER = "PRINTER",
}
export enum AssetFields {
  nickName = "nickName",
  deviceID = "deviceID",
  deviceAmount = "deviceAmount",
}
export enum OrderValidation {
  ASC = "ASC",
  DESC = "DESC",
}

export enum AssetStatus {
  ACTIVE = "Active",
  FORSALE = "For Sale",
  LOST = "Lost",
  FORRENT = "For Rent",
}
export class AssetCreateModel extends Model {
  @IsEnum(AssetType)
  type: AssetType;

  @IsString()
  @IsNotEmpty()
  nickName: string;

  @IsString()
  @IsNotEmpty()
  deviceID: string;

  @IsNumber()
  @IsNotEmpty()
  deviceAmount: number;

  constructor(body: any, params?: any) {
    super();
    this.type = body.type;
    this.nickName = body.nickName;
    this.deviceID = body.deviceID;
    this.deviceAmount = body.deviceAmount;
  }
}
export class AssetGetModel extends Model {
  @IsEnum(AssetStatus)
  @IsOptional()
  status: AssetStatus;

  @IsEnum(AssetFields)
  @IsOptional()
  sort: AssetFields;

  @IsEnum(OrderValidation)
  @IsOptional()
  order: OrderValidation;

  constructor(body: any, params?: any) {
    super();
    this.status = params.status;
    this.sort = params.sort;
    this.order = params.order;
  }
}

export class AssetUpdateModel extends Model {
  @IsEnum(AssetType)
  @IsOptional()
  type: AssetType;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nickName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  deviceID: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  deviceAmount: number;

  @IsEnum(AssetStatus)
  @IsOptional()
  status: AssetStatus;

  constructor(body: any, params?: any) {
    super();
    this.type = body.type;
    this.nickName = body.nickName;
    this.deviceID = body.deviceID;
    this.deviceAmount = body.deviceAmount;
    this.status = body.status;
  }
}
