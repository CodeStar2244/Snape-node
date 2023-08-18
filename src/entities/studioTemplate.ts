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
  import {CDN_URL} from "../config/constants"
  
  @Entity({ name: "studiotemplate" })
  export class StudioTemplate {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 250 })
    @IsNotEmpty()
    type: string;
  
    @Column({ type: "text" })
    description: string;

    @Column('jsonb', { default: {} })
    fields:object
  
    @ManyToOne(() => Tblagent, (agent) => agent.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "agentId" })
    createdBy
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  