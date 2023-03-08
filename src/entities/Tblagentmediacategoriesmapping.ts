import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tblagentmediacategoriesmapping", { schema: "public" })
export class Tblagentmediacategoriesmapping {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;
  
  @Column("integer", { name: "agentid", nullable: true })
  agentid: number | null;

  @Column("integer", { name: "mediacategoryid", nullable: true })
  mediacategoryid: number | null;
}
