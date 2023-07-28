import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CollectionTags } from "./CollectionTags";
import { Tblagent } from "./Tblagent";

export enum CollectionStatus {
    PUBLISH="PUBLISH",
    HIDDEN="HIDDEN"
  }

@Entity("portfolios",{schema:"public"})
export default class PortFolios{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({
        type: "enum",
        enum: CollectionStatus,
        default: CollectionStatus.HIDDEN
    })
    status:CollectionStatus

    @Column({nullable:true,default:0})
    photos:number
    @Column({nullable:true,default:0})
    videos:number


    @Column({nullable:true,default:"https://snape-buckets.b-cdn.net/collectionphoto.jpg"})
    coverPhoto:string

    @Column({
        type:"float",
        default:0,
        nullable:true
    })
    size:number;

    @OneToOne(()=>Tblagent,(agent)=>agent.id,{onDelete:"CASCADE"})
    @JoinColumn({name:"agentId"})
    createdBy


    @CreateDateColumn({type:'timestamptz'})
    createdAt: Date;
 
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;

}