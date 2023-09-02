import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AssetType } from "../modules/assetRegistry/assetRegistry.model";
import { EnterPriseClient } from "./enterPriseClient";

export enum AssetStatus {
  ACTIVE = "Active",
  FORSALE = "For Sale",
  LOST = "Lost",
  FORRENT = "For Rent",
}

@Entity("enterpriseassets", { schema: "public" })
export default class EnterpriseAssets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName: string;

  @Column()
  deviceID: string;

  @Column({
    type: "float",
    default: 0,
  })
  deviceAmount: number;

  @Column({
    type: "enum",
    enum: AssetType,
    default: AssetType.CAMERA,
  })
  type: AssetType;

  @Column({
    type: "enum",
    enum: AssetStatus,
    default: AssetStatus.ACTIVE,
  })
  status: AssetStatus;

  @ManyToOne(() => EnterPriseClient, (client) => client.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "clientId" })
  clientId: EnterPriseClient;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
