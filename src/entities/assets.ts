import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AssetType } from "../modules/assetRegistry/assetRegistry.model";

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
    nickName:string;
    
    @Column()
    deviceID:string;

    @Column()
    deviceAmount:number;

    @Column({
        type:"enum",
        enum:AssetType,
        default:AssetType.CAMERA
    })
    type:AssetType

    @Column({
        type:"enum",
        enum:AssetStatus,
        default:AssetStatus.ACTIVE
    })
    status:AssetStatus

    @CreateDateColumn({type:'timestamptz'})
    createdAt: Date;
 
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;
}