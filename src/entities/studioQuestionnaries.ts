import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tblagent } from "./Tblagent";
import StudioClient from "./studioClient";

@Entity({ name: "studioquestionnaries" })
export class StudioQuestionnaries {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  subject: string;

  @Column()
  type: string;

  @Column()
  email: string;

  @Column()
  message: string;

  @Column({ default: "AWAITING RESPONSE" })
  status: string;

  @Column('jsonb', { default: {} })
  template: object

  @Column('jsonb', { default: {} })
  response: object

  @ManyToOne(() => StudioClient, (client) => client.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "clientId" })
  clientId: StudioClient

  @ManyToOne(() => Tblagent, (agent) => agent.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "agentId" })
  createdBy

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
