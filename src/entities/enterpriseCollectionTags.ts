import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import EnterpriseCollections from "./enterpriseCollections";

@Entity()
export class EnterpriseCollectionTags{

    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    tag:string

    @ManyToMany(()=>EnterpriseCollections,(collection)=>collection.id)
    @JoinTable({name:"enterprisecollection_tag_join"})
    collections:EnterpriseCollections[]

}