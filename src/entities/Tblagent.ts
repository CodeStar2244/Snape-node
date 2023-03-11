import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tblrole } from "./Tblrole";


@Entity("tblagent", { schema: "public" })
export class Tblagent {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "firstname",
    nullable: true,
    length: 100,
  })
  firstname: string | null;

  @Column("character varying", {
    name: "lastname",
    nullable: true,
    length: 100,
  })
  lastname: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 150 })
  email: string | null;

  @Column("character varying", {
    name: "password",
    nullable: true,
    length: 100,
  })
  password: string | null;

  @Column("character varying", { name: "iv", nullable: true, length: 400 })
  iv: string | null;

  @Column("character varying", { name: "envkey", nullable: true, length: 400 })
  envkey: string | null;

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

  @Column("integer", { name: "gender", nullable: true })
  gender: number | null;

  @Column("integer", { name: "experiencelevel", nullable: true })
  experiencelevel: number | null;

  @Column("integer", { name: "speciality", nullable: true })
  speciality: number | null;

  @Column("double precision", {
    name: "photograpyrate",
    nullable: true,
  })
  photograpyrate: number | null;

  @Column("double precision", {
    name: "videograpyrate",
    nullable: true,
  })
  videograpyrate: number | null;

  @Column("character varying", {
    name: "identitycardno",
    nullable: true,
    length: 50,
  })
  identitycardno: string | null;

  @Column("character varying", {
    name: "drivinglicenseno",
    nullable: true,
    length: 50,
  })
  drivinglicenseno: string | null;

  @Column("character varying", {
    name: "licenseexpirydate",
    nullable: true,
    length: 50,
  })
  licenseexpirydate: string | null;

  @Column("character varying", {
    name: "fcmtoken",
    nullable: true,
    length: 500,
  })
  fcmtoken: string | null;

  @Column("double precision", {
    name: "latitude",
    nullable: true
  })
  latitude: number | null;

  @Column("double precision", {
    name: "longitude",
    nullable: true
  })
  longitude: number | null;

  @Column("boolean", {
    name: "isonline",
    nullable: true,
    default: () => "false",
  })
  isonline: boolean | null;

  @Column("boolean", {
    name: "isactive",
    nullable: true,
    default: () => "true",
  })
  isactive: boolean | null;

  @Column("timestamp without time zone", {
    name: "createdondate",
    nullable: true,
  })
  createdondate: Date | null;

  @Column("timestamp without time zone", {
    name: "updatedondate",
    nullable: true,
  })
  updatedondate: Date | null;

  @Column("integer", { name: "experienceinyears", nullable: true })
  experienceinyears: number | null;

  @Column("character varying", {
    name: "birthdate",
    nullable: true,
    length: 30,
  })
  birthdate: string | null;

  @Column("double precision", {
    name: "bothrate",
    nullable: true
  })
  bothrate: number | null;

  @Column("character varying", {
    name: "agentcode",
    nullable: true,
    length: 20,
  })
  agentcode: string | null;

  @Column("character varying", {
    name: "instauserid",
    nullable: true,
    length: 50,
    default: () => "''",
  })
  instauserid: string | null;

  @Column("character varying", {
    name: "instausername",
    nullable: true,
    length: 50,
    default: () => "''",
  })
  instausername: string | null;

  @Column("character varying", {
    name: "bankname",
    nullable: true,
    length: 100,
  })
  bankname: string | null;

  @Column("character varying", {
    name: "accountholder",
    nullable: true,
    length: 100,
  })
  accountholder: string | null;

  @Column("character varying", {
    name: "accountno",
    nullable: true,
    length: 50,
  })
  accountno: string | null;

  @Column("character varying", {
    name: "branchcode",
    nullable: true,
    length: 50,
  })
  branchcode: string | null;

  @ManyToOne(() => Tblrole, (tblrole) => tblrole.tblagents)
  @JoinColumn([{ name: "roleid", referencedColumnName: "id" }])
  role: Tblrole;
}
