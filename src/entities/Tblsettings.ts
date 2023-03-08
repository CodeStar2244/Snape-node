import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("tblsettings_pkey", ["id"], { unique: true })
@Entity("tblsettings", { schema: "public" })
export class Tblsettings {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "privacypolicy",
    nullable: true,
    length: 8000,
  })
  privacypolicy: string | null;

  @Column("character varying", {
    name: "aboutus",
    nullable: true,
    length: 8000,
  })
  aboutus: string | null;

  @Column("character varying", {
    name: "contactus",
    nullable: true,
    length: 8000,
  })
  contactus: string | null;

  @Column("character varying", {
    name: "termsconditions",
    nullable: true,
    length: 8000,
  })
  termsconditions: string | null;

  @Column("timestamp without time zone", { name: "createdondate" })
  createdondate: Date;

  @Column("timestamp without time zone", {
    name: "updatedondate",
    nullable: true,
  })
  updatedondate: Date | null;
}
