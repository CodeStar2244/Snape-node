import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AssetType } from "../modules/assetRegistry/assetRegistry.model";
import { Tblagent } from "./Tblagent";

export enum AgentType {
    ENTERPRISE="ENTERPRISE",
    STUDIO = "STUDIO"
}
@Entity("agentsettings",{schema:"public"})
export default class AgentSettings{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:"float",
        default:0,
        precision:2,
        nullable:true
    })
    storage:number;

    @Column({
        type:"float",
        default:0,
        precision:2,
        nullable:true
    })
    assets:number
    @Column({
        type:"float",
        default:3072,
        precision:2
    })
    totalStorage:number

    @Column({
        type:"enum",
        enum:AgentType,
        default:AgentType.STUDIO
    })
    type:AgentType


    
    @OneToOne(()=>Tblagent,(agent)=>agent.id,{onDelete:"CASCADE"})
    @JoinColumn({name:"agentId"})    
    agentId:Tblagent

    @CreateDateColumn({type:'timestamptz'})
    createdAt: Date;
 
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;
}