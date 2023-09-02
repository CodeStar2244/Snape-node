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
import { CollectionTags } from "./CollectionTags";
import { Tblagent } from "./Tblagent";
import Plans from "./plans";

@Entity("transactions", { schema: "public" })
export default class Collections {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionId: string;

  @Column({ default: "Pending" })
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

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
