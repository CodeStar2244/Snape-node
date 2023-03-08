import { Column, Entity } from "typeorm";

@Entity("tblagentmediacategoriesmapping", { schema: "public" })
export class Tblagentmediacategoriesmapping {
  @Column("integer", { name: "agentid", nullable: true })
  agentid: number | null;

  @Column("integer", { name: "mediacategoryid", nullable: true })
  mediacategoryid: number | null;
}
