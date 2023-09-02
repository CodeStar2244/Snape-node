import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tblrole } from "./Tblrole";

@Entity("enterPriseClient", { schema: "public" })
export class EnterPriseClient {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "name",
    nullable: true,
    length: 100,
  })
  name: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 150 })
  email: string | null;

  @Column("character varying", {
    name: "password",
    nullable: true,
    length: 100,
  })
  password: string | null;

  @Column("character varying", {
    name: "countrycode",
    nullable: true,
    length: 10,
  })
  countrycode: string | null;

  @Column("character varying", {
    name: "phone",
    nullable: true,
    unique: true,
    length: 30,
  })
  phone: string | null;

  @Column("boolean", {
    name: "otpverification",
    nullable: true,
    default: () => "false",
  })
  otpverification: boolean | null;

  @Column("character varying", {
    name: "facebookid",
    nullable: true,
    length: 400,
  })
  facebookid: string | null;

  @Column("character varying", {
    name: "googleid",
    nullable: true,
    length: 400,
  })
  googleid: string | null;

  @Column("character varying", {
    name: "fcmtoken",
    nullable: true,
    length: 500,
  })
  fcmtoken: string | null;

  @Column("double precision", {
    name: "latitude",
    nullable: true,
  })
  latitude: number | null;

  @Column("double precision", {
    name: "longitude",
    nullable: true,
  })
  longitude: number | null;

  @Column("boolean", {
    name: "isactive",
    nullable: true,
    default: () => "true",
  })
  isactive: boolean | null;

  @Column()
  registrationNumber: string;

  @Column()
  userName: string;

  @Column("integer", { name: "gender", nullable: true })
  gender: number | null;

  @Column("character varying", {
    name: "birthdate",
    nullable: true,
    length: 30,
  })
  birthdate: string | null;

  @ManyToOne(() => Tblrole, (tblrole) => tblrole.tblclients)
  @JoinColumn([{ name: "roleid", referencedColumnName: "id" }])
  role: Tblrole;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
