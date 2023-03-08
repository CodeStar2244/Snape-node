import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("tblmediaschool_pkey", ["id"], { unique: true })
@Entity("tblmediaschool", { schema: "public" })
export class Tblmediaschool {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 100 })
  name: string | null;

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

  @Column("character varying", {
    name: "address1",
    nullable: true,
    length: 500,
  })
  address1: string | null;

  @Column("character varying", {
    name: "address2",
    nullable: true,
    length: 500,
  })
  address2: string | null;

  @Column("integer", { name: "category", nullable: true })
  category: number | null;

  @Column("integer", { name: "rating", nullable: true })
  rating: number | null;

  @Column("character varying", { name: "aboutus", nullable: true, length: 500 })
  aboutus: string | null;

  @Column("character varying", { name: "website", nullable: true, length: 100 })
  website: string | null;

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
