import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AssetType } from "../modules/assetRegistry/assetRegistry.model";
import { Tblagent } from "./Tblagent";


@Entity("enterpricesettings",{schema:"public"})
export default class EnterpriseSettings{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    registrationNumber : string;

    @Column()
    userName : string;
    
    @OneToOne(()=>Tblagent,(agent)=>agent.id,{onDelete:"CASCADE"})
    @JoinColumn({name:"agentId"})    
    agentId:Tblagent

    @CreateDateColumn({type:'timestamptz'})
    createdAt: Date;
 
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;
}