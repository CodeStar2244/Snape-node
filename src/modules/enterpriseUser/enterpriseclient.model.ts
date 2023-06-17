import { ArrayMinSize, IsArray, IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";

import { Model } from "../../helpers/model";



export class EnterpriseRegister extends Model {
    @IsString()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public registrationNumber: string;

    @IsNotEmpty()
    public userName: string;

    @IsNotEmpty()
    public password: string;

    @IsNotEmpty()
    public confirmPassword: string;

    constructor(body: any, params: any) {
        super();
        this.email = body.email;
        this.name = body.name;
        this.password=body.password;
        this.registrationNumber = body.registrationNumber;
        this.confirmPassword = body.confirmPassword;
        this.userName = body.userName;
        
    }
}
export class EnterpriseLogin extends Model {
    @IsString()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    public password: string;

    constructor(body: any, params: any) {
        super();
        this.email = body.email;
        this.password=body.password;        
    }
}






