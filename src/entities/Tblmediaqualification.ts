import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("tblmediaqualification_pkey", ["id"], { unique: true })
@Entity("tblmediaqualification", { schema: "public" })
export class Tblmediaqualification {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "agentid", nullable: true })
  agentid: number | null;

  @Column("character varying", {
    name: "qualificationtype",
    nullable: true,
    length: 100,
  })
  qualificationtype: string | null;

  @Column("character varying", { name: "field", nullable: true, length: 100 })
  field: string | null;

  @Column("character varying", { name: "school", nullable: true, length: 255 })
  school: string | null;

  @Column("character varying", {
    name: "yearofcompletion",
    nullable: true,
    length: 50,
  })
  yearofcompletion: string | null;
}
