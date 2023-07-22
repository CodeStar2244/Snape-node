import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Model } from "../../helpers/model";
import { NumOpenProactiveInsights, NumOpenReactiveInsights } from "aws-sdk/clients/devopsguru";

enum isFavourite {
 "zero"='0',
 "one"='1'
}
enum speciality {
 "photographer"=1,
 "videographer"=2,
 "both"=3,
}

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


export class AgentGetLocationList extends Model {
   
    @IsNotEmpty()
    @IsLatitude()
    latitude:String

    @IsNotEmpty()
    @IsLongitude()
    longitude:String

    @IsOptional()
    range:number



    constructor(body: any, params?: any) {
        super();
        this.latitude = params.latitude;
        this.longitude = params.longitude;
        if(params.range){
            this.range = params.range
        }else{
            this.range = 45
        }        
    }
    

}


export class AgentFavourite extends Model {

    @IsNotEmpty()
    @IsEnum(isFavourite)
    isFavourite:string

    constructor(body: any, params?: any) {
        super();
        this.isFavourite = params.isFavourite
               
    }
    

}
export class BookAgent extends Model {

    @IsNotEmpty()
    bookingDate:Date;
    
    @IsNotEmpty()
    bookingStartDateTime:string;

    @IsNotEmpty()
    bookingEndDateTime:string;

    @IsNotEmpty()
    address1:string;

    @IsOptional()
    address2:string;

    @IsNotEmpty()
    latitude:string;

    @IsNotEmpty()
    longitude:string;

    @IsNotEmpty()
    @IsEnum(speciality)
    speciality:number;
    
    @IsNotEmpty()
    hours:number

    constructor(body: any, params?: any) {
        super();
        this.bookingDate=body.bookingDate;
        this.bookingStartDateTime=body.bookingStartDateTime;
        this.bookingEndDateTime=body.bookingEndDateTime;
        this.address1=body.address1;
        this.latitude=body.latitude;
        this.longitude=body.longitude;
        this.speciality=body.speciality;
        this.hours=  body.hours;


    }
    

}