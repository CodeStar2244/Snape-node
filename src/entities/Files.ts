import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Collections from "./Collection";


export enum FileType {
    PHOTO="PHOTO",
    VIDEO="VIDEO"
  }

@Entity("files",{schema:"public"})
export default class FilesEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    url:string;
    
    @Column()
    cdnUrl:string;

    @Column({nullable:true})
    compressedKey:string;

    @Column({nullable:true})
    compressedCdnUrl:string;

    @Column({nullable:true , type:"float" , default:0})
    compressedImageSize:number;
    
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

    @ManyToOne(()=>Collections,(collection)=>collection.id,{onDelete:"CASCADE"})
    collection:Collections;

    @CreateDateColumn({type:'timestamptz'})
    createdAt: Date;
 
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;

}