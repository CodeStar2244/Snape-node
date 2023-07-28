import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Collections from "./Collection";
import PortFolios from "./Portfolio";


export enum FileType {
    PHOTO="PHOTO",
    VIDEO="VIDEO"
  }

@Entity("portfolioFiles",{schema:"public"})
export default class PortFolioFiles{

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

    @ManyToOne(()=>PortFolios,(portfolio)=>portfolio.id,{onDelete:"CASCADE"})
    portfolio:PortFolios;

    @CreateDateColumn({type:'timestamptz'})
    createdAt: Date;
 
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;

}