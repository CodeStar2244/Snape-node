import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import EnterpriseCollections from "./enterpriseCollections";


export enum FileType {
    PHOTO="PHOTO",
    VIDEO="VIDEO"
  }

@Entity("enterprisefiles",{schema:"public"})
export default class EnterpriseFilesEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    url:string;
    
    @Column()
    cdnUrl:string;
    
    @Column()
    key:string;
    
    @Column({
        type:"float",
        default:0
    })
    size:number;

    @Column()
    height:number;
    
    @Column()
    width:number;

    @Column({
        type: "enum",
        enum: FileType,
        default: FileType.PHOTO
    })
    type:FileType

    @ManyToOne(()=>EnterpriseCollections,(collection)=>collection.id,{onDelete:"CASCADE"})
    collection:EnterpriseCollections;

    @CreateDateColumn({type:'timestamptz'})
    createdAt: Date;
 
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;

}