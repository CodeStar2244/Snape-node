import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("tblmediacategories", { schema: "public" })
export class Tblmediacategories {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "title", nullable: true, length: 100 })
  title: string | null;

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
}
