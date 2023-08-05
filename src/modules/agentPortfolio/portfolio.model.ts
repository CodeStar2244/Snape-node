import { ArrayMinSize, IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { CollectionStatus } from "../../entities/Portfolio";
import { FileType } from "../../entities/Files";
import { Model } from "../../helpers/model";
import { Type } from 'class-transformer';
import { GridSpacingEnum, GridStyleEnum } from "../../entities/collectionDesign";
import { OrderValidation } from "../assetRegistry/assetRegistry.model";




export class PortfolioGetModel extends Model {

    @IsEnum(OrderValidation)
    @IsOptional()
    order: OrderValidation
    constructor(body: any, params?: any) {
        super();
        this.order = params.order
    }
}
export class UpdatePortfolioModel extends Model {
    @MinLength(2)
    @IsString()
    @IsOptional()
    public name: string;

    @IsString()
    @IsOptional()
    
    public url: string;
    @IsString()
    @IsOptional()
    public slug: string;

    @IsString()
    @IsOptional()
    public coverPhoto: string;

    @IsString()
    @IsOptional()
    public eventDate: Date;

    @IsString()
    @IsOptional()
    public password: string;

    @IsString()
    @IsOptional()
    public downloadPin: string;

    @IsArray()
    @IsOptional()
    public tags: string[];


    @IsBoolean()
    @IsOptional()
    public download: boolean

    @IsBoolean()
    @IsOptional()
    public socialSharing: boolean




    @IsEnum(CollectionStatus)
    @IsOptional()
    public status: CollectionStatus

    constructor(body: any, params?: any) {
        super();
        this.name = body.name
        this.eventDate = body.eventDate
        this.url = body.url
        this.status = body.status
        this.download = body.download
        this.downloadPin = body.downloadPin
        this.password = body.password
        this.tags = body.tags
        this.socialSharing = body.socialSharing
        this.coverPhoto = body.coverPhoto
        this.slug =  body.slug
    }
}


export class PortfolioDesignModel extends Model {
    @IsString()
    @IsOptional()
    typography: string

    @IsNumber()
    @IsOptional()
    theme: number

    @IsNumber()
    @IsOptional()
    public x: number

    @IsNumber()
    @IsOptional()
    public y: number

    @IsEnum(GridStyleEnum)
    @IsOptional()
    gridStyle: GridStyleEnum

    @IsEnum(GridSpacingEnum)
    @IsOptional()
    gridSpacing: GridSpacingEnum

    constructor(body: any, params?: any) {
        super();
        this.typography = body.typography
        this.theme = body.theme
        this.x = body.x
        this.y = body.y
        this.gridStyle = body.gridStyle
        this.gridSpacing = body.gridSpacing
    }
}

class FileClass extends Model {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    key: string;

    @IsNumber()
    @IsNotEmpty()
    size: number;

    @IsEnum(FileType)
    @IsNotEmpty()
    type: FileType

    @IsNumber()
    height:number

    @IsNumber()
    width:number



    constructor() {
        super();


    }

}

export class UploadFilesModel extends Model {



    @ArrayMinSize(1)
    @IsArray()
    @ValidateNested()
    files: FileClass[]




    constructor(body: any, params: any) {
        super();
        const fileArr: FileClass[] = [];
        for (const file of body.files) {
            const fileObj = new FileClass();
            fileObj.name = file.name;
            fileObj.size = file.size;
            fileObj.type = file.type;
            fileObj.url = file.url
            fileObj.height=file.height
            fileObj.width=file.width
            fileObj.key = file.key
            fileArr.push(fileObj);
        }
        this.files = fileArr;

    }
}



