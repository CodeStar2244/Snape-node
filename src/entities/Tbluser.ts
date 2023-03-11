import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tblrole } from "./Tblrole";


@Entity("tbluser", { schema: "public" })
export class Tbluser {
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

  @Column("character varying", {
    name: "countrycode",
    nullable: true,
    length: 10,
  })
  countrycode: string | null;

  @Column("character varying", { name: "phone", unique: true, length: 30 })
  phone: string;

  @Column("character varying", { name: "email", nullable: true, length: 150 })
  email: string | null;

  @Column("character varying", { name: "password", length: 100 })
  password: string;

  @Column("character varying", { name: "iv", nullable: true, length: 400 })
  iv: string | null;

  @Column("character varying", { name: "envkey", nullable: true, length: 400 })
  envkey: string | null;

  @Column("boolean", {
    name: "issuperadmin",
    nullable: true,
    default: () => "false",
  })
  issuperadmin: boolean | null;

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

  @ManyToOne(() => Tblrole, (tblrole) => tblrole.tblusers)
  @JoinColumn([{ name: "roleid", referencedColumnName: "id" }])
  role: Tblrole;
}
