import { IsNotEmpty, IsString, MinLength,IsOptional } from "class-validator";
import { Model } from "../../helpers/model";


export class CreateStudioClientModel extends Model {
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    public name: string;

    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    public email: string;

    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    public phone: string;

    @IsOptional()
    profileUrl: string

    constructor(body: any, params: any) {
        super();
        this.name = body.name;
        this.email = body.email
        this.phone = body.phone
        this.profileUrl = body?.profileUrl
    }
}

export class CreateSpeciality extends Model {
    @IsNotEmpty({
        message: 'Please enter question',
    })
    name: string

    @IsOptional()
    imageUrl: string

    constructor(body: any) {
        super();
        const {
            name, imageUrl
        } = body;
        this.name = name?.trim();
        this.imageUrl = imageUrl?.trim();
    }
}

export class GetSpeciality extends Model {

    @IsNotEmpty({
        message: 'Please enter limit',
    })
    limit: number

    @IsNotEmpty({
        message: 'Please enter page',
    })
    page: number

    constructor(_body: any, query: any) {
        super();
        const {
            limit, page
        } = query;
        this.limit = limit?.trim();
        this.page = page?.trim();
    }

}

export class UpdateSpeciality extends Model {

    @IsOptional()
    name: string

    @IsOptional()
    imageUrl: string

    constructor(body: any) {
        super();
        const {
            name, imageUrl
        } = body;
        this.name = name?.trim();
        this.imageUrl = imageUrl?.trim();
    }
}


