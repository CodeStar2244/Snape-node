import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";




@Entity("assetCategory",{schema:"public"})
export default class AssetCategory{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    
    @Column()
    imeiNumber:string;

    @Column()
    price:number;

    @ManyToOne(()=>AssetCategory,(category)=>category.id)
    category:AssetCategory

  
    @CreateDateColumn({type:'timestamptz'})
    createdAt: Date;
 
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;

}