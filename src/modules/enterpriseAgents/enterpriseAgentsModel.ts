import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Model } from "../../helpers/model";
import { NumOpenProactiveInsights } from "aws-sdk/clients/devopsguru";

export class AgentGetList extends Model {
   
    @IsNotEmpty()
    @IsLatitude()
    latitude:String

    @IsNotEmpty()
    @IsLongitude()
    longitude:String

    @IsOptional()
    range:number

    @IsNotEmpty()
    page:number

    @IsNotEmpty()
    limit:number


   


    constructor(body: any, params?: any) {
        super();
        this.latitude = params.latitude;
        this.longitude = params.longitude;
        if(params.range){
            this.range = params.range
        }else{
            this.range = 45
        }
        this.page = params.page;
        this.limit = params.limit
        
    }
    

}