import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("files",{schema:"public"})
export default class Files{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    url:string
    
    @Column()
    size:number

    @CreateDateColumn({type:'timestamptz'})
    createdAt: Date;
 
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;

}