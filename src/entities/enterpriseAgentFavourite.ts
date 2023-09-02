import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AssetType } from "../modules/assetRegistry/assetRegistry.model";
import { EnterPriseClient } from "./enterPriseClient";
import { Tblagent } from "./Tblagent";

@Entity("enterpriseAgentFavourite", { schema: "public" })
export default class EnterpriseAgentFavourite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EnterPriseClient, (client) => client.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "clientId" })
  clientId: EnterPriseClient;

  @ManyToOne(() => Tblagent, (agent) => agent.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "agentId" })
  agentId: Tblagent;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
