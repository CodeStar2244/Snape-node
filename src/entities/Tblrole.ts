import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tblagent } from "./Tblagent";
import { Tblclient } from "./Tblclient";
import { Tbluser } from "./Tbluser";

@Index("tblrole_pkey", ["id"], { unique: true })
@Index("tblrole_rolename_key", ["rolename"], { unique: true })
@Entity("tblrole", { schema: "public" })
export class Tblrole {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "rolename", unique: true, length: 50 })
  rolename: string;

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

  @OneToMany(() => Tblagent, (tblagent) => tblagent.role)
  tblagents: Tblagent[];

  @OneToMany(() => Tblclient, (tblclient) => tblclient.role)
  tblclients: Tblclient[];

  @OneToMany(() => Tbluser, (tbluser) => tbluser.role)
  tblusers: Tbluser[];
}
