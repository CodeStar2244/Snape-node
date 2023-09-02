import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AssetType } from "../modules/assetRegistry/assetRegistry.model";
import { Tblagent } from "./Tblagent";

export enum AssetStatus {
  ACTIVE = "Active",
  FORSALE = "For Sale",
  LOST = "Lost",
  FORRENT = "For Rent",
}

@Entity("assets", { schema: "public" })
export default class Assets {
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

  @ManyToOne(() => Tblagent, (agent) => agent.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "agentId" })
  agentId: Tblagent;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
