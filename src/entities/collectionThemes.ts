import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Collections from "./Collection";

@Entity()
export class CollectionThemes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  background: string;

  @Column()
  accent: string;

  @Column()
  button: string;
}
