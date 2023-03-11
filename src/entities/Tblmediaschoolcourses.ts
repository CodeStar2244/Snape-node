import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("tblmediaschoolcourses", { schema: "public" })
export class Tblmediaschoolcourses {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "mediaschoolid", nullable: true })
  mediaschoolid: number | null;

  @Column("character varying", { name: "title", nullable: true, length: 100 })
  title: string | null;
}
