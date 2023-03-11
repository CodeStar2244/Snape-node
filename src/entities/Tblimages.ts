import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("tblimages", { schema: "public" })
export class Tblimages {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entitytype", length: 255 })
  entitytype: string;

  @Column("integer", { name: "entityid" })
  entityid: number;

  @Column("character varying", {
    name: "imagename",
    nullable: true,
    length: 255,
  })
  imagename: string | null;

  @Column("character varying", {
    name: "imagepath",
    nullable: true,
    length: 255,
  })
  imagepath: string | null;

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
}
