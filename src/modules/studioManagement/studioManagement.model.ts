import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsIn,
  IsNumber,
  IsDate,
  IsDateString,
} from "class-validator";
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
  profileUrl: string;

  constructor(body: any, params: any) {
    super();
    this.name = body.name;
    this.email = body.email;
    this.phone = body.phone;
    this.profileUrl = body?.profileUrl;
  }
}

export class UpdateStudioClientModel extends Model {
  @IsOptional()
  public name: string;

  @IsOptional()
  public email: string;

  @IsOptional()
  public phone: string;

  @IsOptional()
  profileUrl: string;

  constructor(body: any, params: any) {
    super();
    this.name = body.name;
    this.email = body.email;
    this.phone = body.phone;
    this.profileUrl = body?.profileUrl;
  }
}

export class CreateSpeciality extends Model {
  @IsNotEmpty({
    message: "Please enter question",
  })
  name: string;

  @IsOptional()
  imageUrl: string;

  constructor(body: any) {
    super();
    const { name, imageUrl } = body;
    this.name = name?.trim();
    this.imageUrl = imageUrl?.trim();
  }
}

export class GetSpeciality extends Model {
  @IsNotEmpty({
    message: "Please enter limit",
  })
  limit: number;

  @IsNotEmpty({
    message: "Please enter page",
  })
  page: number;

  constructor(_body: any, query: any) {
    super();
    const { limit, page } = query;
    this.limit = limit?.trim();
    this.page = page?.trim();
  }
}

export class UpdateSpeciality extends Model {
  @IsOptional()
  name: string;

  @IsOptional()
  imageUrl: string;

  constructor(body: any) {
    super();
    const { name, imageUrl } = body;
    this.name = name?.trim();
    this.imageUrl = imageUrl?.trim();
  }
}

export class GetTemplates extends Model {
  @IsNotEmpty()
  @IsIn(["Photography", "Videography"])
  type: string;

  constructor(body: any, query: any) {
    super();
    const { type } = query;
    this.type = type?.trim();
  }
}

export class CreateTemplate extends Model {
  @IsNotEmpty()
  @IsIn(["Photography", "Videography"])
  type: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  fields: any[];

  constructor(body: any) {
    super();
    const { type, description, fields } = body;
    this.type = type?.trim();
    this.description = description?.trim();
    this.fields = fields;
  }
}

export class CreateQuestionnaries extends Model {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsIn(["Photography", "Videography"])
  type: string;

  @IsNotEmpty()
  email: string;

  @IsNumber()
  clientId: number;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  message: string;

  constructor(body: any) {
    super();
    const { name, type, email, clientId, subject, message } = body;
    this.name = name?.trim();
    this.type = type?.trim();
    this.email = email?.trim();
    this.clientId = clientId;
    this.subject = subject?.trim();
    this.message = message?.trim();
  }
}

export class CreateInvoice extends Model {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  notes: string;

  @IsNumber()
  clientId: number;

  constructor(body: any) {
    super();
    const { name, currency, notes, clientId, subject } = body;
    this.name = name?.trim();
    this.currency = currency?.trim();
    this.subject = subject?.trim();
    this.notes = notes?.trim();
    this.clientId = clientId;
  }
}

export class CreateQuotation extends Model {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  notes: string;

  @IsNumber()
  clientId: number;

  constructor(body: any) {
    super();
    const { name, currency, notes, clientId, subject } = body;
    this.name = name?.trim();
    this.currency = currency?.trim();
    this.subject = subject?.trim();
    this.notes = notes?.trim();
    this.clientId = clientId;
  }
}

export class CreateBooking extends Model {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  notes: string;

  @IsNumber()
  clientId: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  constructor(body: any) {
    super();
    const { title, description, notes, clientId, startDate, endDate } = body;
    this.title = title?.trim();
    this.description = description?.trim();
    this.startDate = startDate?.trim();
    this.endDate = endDate?.trim();
    this.notes = notes?.trim();
    this.clientId = clientId;
  }
}
