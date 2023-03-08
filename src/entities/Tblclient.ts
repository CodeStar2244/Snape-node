import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tblrole } from "./Tblrole";

@Index("tblclient_pkey", ["id"], { unique: true })
@Index("tblclient_phone_key", ["phone"], { unique: true })
@Entity("tblclient", { schema: "public" })
export class Tblclient {
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

  @Column("character varying", {
    name: "fcmtoken",
    nullable: true,
    length: 500,
  })
  fcmtoken: string | null;

  @Column("double precision", {
    name: "latitude",
    nullable: true,
    precision: 53,
  })
  latitude: number | null;

  @Column("double precision", {
    name: "longitude",
    nullable: true,
    precision: 53,
  })
  longitude: number | null;

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
}
