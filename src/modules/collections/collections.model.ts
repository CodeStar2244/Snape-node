import { IsNotEmpty ,IsString , MinLength} from "class-validator";
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

