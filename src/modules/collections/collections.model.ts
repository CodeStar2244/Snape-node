import { ArrayMinSize, IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty ,IsNumber,IsObject,IsOptional,IsString , MinLength, ValidateNested} from "class-validator";
import { CollectionStatus } from "../../entities/Collection";
import { FileType } from "../../entities/Files";
import { Model } from "../../helpers/model";
import { Type } from 'class-transformer';


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
    @IsOptional()
    public name: string;
    
    @IsString()
    @IsOptional()
    public url: string;
    
    @IsString()
    @IsOptional()
    public eventDate: Date;
    
    @IsString()
    @IsOptional()
    public password: string;
    
    @IsString()
    @IsOptional()
    public downloadPin: string;

    @IsString()
    @IsOptional()
    public tags: string;
   
    
    @IsBoolean()
    @IsOptional()
    public download :boolean

    @IsBoolean()
    @IsOptional()
    public socialSharing :boolean
    
    
    

    @IsEnum(CollectionStatus)
    @IsOptional()
    public status : CollectionStatus

    constructor(body: any,params?:any) {
        console.log(body.eventDate , "dasta")
        super();
        this.name = body.name
        this.eventDate = body.eventDate
        this.url = body.url
        this.status=body.status
        this.download=body.download
        this.downloadPin=body.downloadPin
        this.password=body.password
        this.tags=body.tags
        this.socialSharing = body.socialSharing
    }
}

class FileClass extends Model {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    url:string;
    
    @IsString()
    @IsNotEmpty()
    key:string;
    
    @IsNumber()
    @IsNotEmpty()
    size:number;

    @IsEnum(FileType)
    @IsNotEmpty()
    type:FileType
    
   

    constructor() {
        super();
      
        
    }

}

export class UploadFilesModel extends Model {
 


    @ArrayMinSize(1)
    @IsArray()
    @ValidateNested()
    files:FileClass[]

   
   

    constructor(body: any,params:any) {
        super();
        const fileArr :FileClass[]=[];
        for(const file of body.files){
            const fileObj = new FileClass();
            fileObj.name = file.name;
            fileObj.size=file.size;
            fileObj.type=file.type;
            fileObj.url=file.url
            fileObj.key=file.key
            fileArr.push(fileObj);
        }
        this.files = fileArr;
        
    }
}



