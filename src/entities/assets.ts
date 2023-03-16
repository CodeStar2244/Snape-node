import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import AssetCategory from "./assetCategory";


export enum AssetStatus {
    ACTIVE="Active",
    FORSALE="For Sale",
    LOST="Lost",
    FORRENT="For Rent"
}

@Entity("assets",{schema:"public"})
export default class Assets{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    
    @Column()
    imeiNumber:string;

    @Column()
    price:number;

    @Column({
        type:"enum",
        enum:AssetStatus
    })
    status:AssetStatus

    @ManyToOne(()=>AssetCategory,(category)=>category.id)
    category:AssetCategory


  
    @CreateDateColumn({type:'timestamptz'})
    createdAt: Date;
 
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;

}