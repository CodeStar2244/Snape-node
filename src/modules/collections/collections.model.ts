import { IsBoolean, IsDate, IsEnum, IsNotEmpty ,IsOptional,IsString , MinLength} from "class-validator";
import { CollectionStatus } from "../../entities/Collection";
import { Model } from "../../helpers/model";

export class CreateCollectionModel extends Model {
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public eventDate: string;

    constructor(body: any,params:any) {
        super();
        this.name = body.name;
        this.eventDate = body.eventDate
    }
}
export class UpdateCollectionModel extends Model {
    @MinLength(2)
    @IsString()
    public name: string;
    @IsString()
    public url: string;
    
    @IsDate()
    @IsOptional()
    public eventDate: Date;
    
    @IsString()
    @IsOptional()
    public password: string;
    
    @IsString()
    @IsOptional()
    public downloadPin: string;
   
    
    @IsBoolean()
    @IsOptional()
    public download :boolean
    
    
    

    @IsEnum(CollectionStatus)
    @IsOptional()
    public status : CollectionStatus

    constructor(body: any,params?:any) {
        super();
        this.name = body.name
        this.eventDate = new Date(body.eventDate)
        this.url = body.url
        this.status=body.status
        this.download=body.download
        this.downloadPin=body.downloadPin
        this.password=body.password
    }
}

