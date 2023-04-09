import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Collections  from "./Collection";
import { CollectionThemes } from "./CollectionThemes";

export enum GridStyleEnum {
    VERTICAL="column",
    HORIZONAL="row"
  }
export enum GridSpacingEnum {
    REGULAR="regular",
    LARGE="large"
  }

@Entity()
export class CollectionDesign{

    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:true})
    typography:string

    @ManyToOne(()=>CollectionThemes,(theme)=>theme.id,{nullable:true})
    theme:CollectionThemes

    @Column({type:"enum",
    enum: GridStyleEnum,
    default: GridStyleEnum.VERTICAL})
    gridStyle:string

    @Column({type:"enum",
    enum: GridSpacingEnum,
    default: GridSpacingEnum.REGULAR})
    gridSpacing:string

    @Column({nullable:true})
    focusX:number

    @Column({nullable:true})
    focusY:number

    @OneToOne(()=>Collections,(collection)=>collection.id,{onDelete:"CASCADE"})
    @JoinColumn({name:"collectionId"})
    collections:Collections

}