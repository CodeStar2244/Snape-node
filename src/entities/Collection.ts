import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CollectionTags } from "./CollectionTags";
import { Tblagent } from "./Tblagent";

export enum CollectionStatus {
    PUBLISH="PUBLISH",
    UNPUBLISH="UNPUBLISH"
  }

@Entity("collections",{schema:"public"})
export default class Collections{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    eventDate:Date

    @Column({unique:true,nullable:true})
    url!:string

    @Column({
        type: "enum",
        enum: CollectionStatus,
        default: CollectionStatus.UNPUBLISH
    })
    status:CollectionStatus

    @ManyToMany(()=>CollectionTags,(tags)=>tags.id,{cascade:true})
    @JoinTable({name:"collection_tag_join"})
    tags:CollectionTags[]
    
    @Column({default:false})
    socialSharing:Boolean

    @Column({nullable:true})
    password:string

    @Column({type:"boolean",default:false})
    download:boolean

    @Column({nullable:true})
    downloadPin:string

    @ManyToOne(()=>Tblagent,(agent)=>agent.id)
    @JoinColumn({name:"agentId"})
    createdBy


    @CreateDateColumn({type:'timestamptz'})
    createdAt: Date;
 
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;

}