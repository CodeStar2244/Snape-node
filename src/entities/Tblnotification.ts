import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("tblnotification_pkey", ["id"], { unique: true })
@Entity("tblnotification", { schema: "public" })
export class Tblnotification {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entitytype", length: 255 })
  entitytype: string;

  @Column("integer", { name: "entityid" })
  entityid: number;

  @Column("character varying", {
    name: "notificationtitle",
    nullable: true,
    length: 100,
  })
  notificationtitle: string | null;

  @Column("character varying", {
    name: "notificationbody",
    nullable: true,
    length: 400,
  })
  notificationbody: string | null;

  @Column("boolean", {
    name: "isactive",
    nullable: true,
    default: () => "true",
  })
  isactive: boolean | null;

  @Column("timestamp without time zone", { name: "createdondate" })
  createdondate: Date;

  @Column("timestamp without time zone", {
    name: "updatedondate",
    nullable: true,
  })
  updatedondate: Date | null;
}
