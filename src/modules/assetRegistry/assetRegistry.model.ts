import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Model } from "../../helpers/model";

export enum AssetType {
    CELL_PHONE="CELL_PHONE",
    CAMERA="CAMERA",
    SCREEN="SCREEN",
    PRINTER="PRINTER"
  }
export class AssetCreateModel extends Model {
    @IsEnum(AssetType)
    type: AssetType

    @IsString()
    @IsNotEmpty()
    nickName: string

    @IsString()
    @IsNotEmpty()
    deviceID: string
    
    @IsNumber()
    @IsNotEmpty()
    deviceAmount: number

    constructor(body: any, params?: any) {
        super();
        this.type = body.type
        this.nickName = body.nickName
        this.deviceID = body.deviceID
        this.deviceAmount = body.deviceAmount
    }
}