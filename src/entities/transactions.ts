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
import Plans from "./plans";

@Entity("transactions", { schema: "public" })
export default class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionId: string;

  @Column({ default: "ongoing" })
  status: string;

  @Column()
  amount: number;

  @Column()
  referenceId: string;

  @ManyToOne(() => Plans, (plan) => plan.id)
  @JoinColumn({ name: "planId" })
  planId: Plans;

  @ManyToOne(() => Tblagent, (agent) => agent.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "agentId" })
  agentId: Tblagent;

  @Column({ type: "timestamptz", nullable: true })
  succeededAt: Date;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
