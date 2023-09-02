import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Model } from "../../helpers/model";

export class CollectionDesignModel extends Model {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  password: string;

  constructor(body: any, params?: any) {
    super();
    this.url = body.url;
    this.password = body.password;
  }
}
