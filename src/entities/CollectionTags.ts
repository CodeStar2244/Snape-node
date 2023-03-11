import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Collections  from "./Collection";

@Entity()
export class CollectionTags{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    tag:string

    @ManyToMany(()=>Collections,(collection)=>collection.id)
    @JoinTable({name:"collection_tag_join"})
    collections:Collections[]

}