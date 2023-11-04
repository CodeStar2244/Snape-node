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

@Entity("agentPlans", { schema: "public" })
export default class AgentPlans {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Plans, (plan) => plan.id)
  @JoinColumn({ name: "planId" })
  planId: Plans;

  @Column({ type: "timestamptz" })
  validTill: Date;

  @ManyToOne(() => Tblagent, (agent) => agent.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "agentId" })
  agentId: Tblagent;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
