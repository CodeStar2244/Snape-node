import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AssetType } from "../modules/assetRegistry/assetRegistry.model";
import { EnterPriseClient } from "./enterPriseClient";

@Entity("enterprisesettings", { schema: "public" })
export default class EnterPriseSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "float",
    default: 0,
    nullable: true,
  })
  storage: number;

  @Column({
    type: "float",
    default: 0,
    nullable: true,
  })
  assets: number;
  @Column({
    type: "float",
    default: 3072,
  })
  totalStorage: number;

  @OneToOne(() => EnterPriseClient, (client) => client.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "clientId" })
  clientId: EnterPriseClient;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
