import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Tblagent } from "./Tblagent";
import { CDN_URL } from "../config/constants";

@Entity({ name: "studiospeciality" })
export class StudioSpeciality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 250 })
  @IsNotEmpty()
  name: string;

  @Column({ type: "text", default: `${CDN_URL}default/userprofile.png` })
  imageUrl: string;

  @ManyToOne(() => Tblagent, (agent) => agent.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "agentId" })
  createdBy;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
