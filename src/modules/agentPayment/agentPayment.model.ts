import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Model } from "../../helpers/model";

export class InitiatePaymentModel extends Model {
  @IsNumber()
  public planId: number;

  constructor(body: any, params?: any) {
    super();
    this.planId = body.planId;
  }
}
