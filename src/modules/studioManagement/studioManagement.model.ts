import { IsNotEmpty, IsString, MinLength } from "class-validator";
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

    constructor(body: any, params: any) {
        super();
        this.name = body.name;
        this.email = body.email
        this.phone = body.phone
    }
}
