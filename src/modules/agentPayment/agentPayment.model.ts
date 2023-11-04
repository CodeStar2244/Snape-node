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
  public amount: number;

  @IsNumber()
  public planId: number;

  constructor(body: any, params?: any) {
    super();
    this.amount = body.amount;
    this.planId = body.planId;
  }
}
