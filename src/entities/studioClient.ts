import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tblagent } from "./Tblagent";
import { CDN_URL } from "../config/constants";

@Entity("studioclient", { schema: "public" })
export default class StudioClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column("character varying", {
    name: "phone",
    nullable: true,
    unique: true,
    length: 30,
  })
  phone: string | null;

  @Column({ type: "text", default: `${CDN_URL}default/userprofile.png` })
  profileUrl: string;

  @ManyToOne(() => Tblagent, (agent) => agent.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "agentId" })
  createdBy;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
