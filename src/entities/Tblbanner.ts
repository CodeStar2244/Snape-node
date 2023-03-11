import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("tblbanner", { schema: "public" })
export class Tblbanner {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "title", length: 100 })
  title: string;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 255,
  })
  description: string | null;

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

  @Column("character varying", { name: "link", nullable: true, length: 300 })
  link: string | null;
}
