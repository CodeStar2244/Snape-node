import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Collections from "./Collection";
import PortFolios from "./Portfolio";

export enum VideoType {
  YOUTUBE = "YOUTUBE",
  VIMEO = "VIMEO",
}

@Entity("portFolioVideoLinks", { schema: "public" })
export default class PortFolioVideoLinks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: true,
  })
  url: string;

  @Column()
  iframe: string;

  @Column({
    type: "enum",
    enum: VideoType,
    default: VideoType.YOUTUBE,
  })
  type: VideoType;

  @ManyToOne(() => PortFolios, (portfolio) => portfolio.id, {
    onDelete: "CASCADE",
  })
  portfolio: PortFolios;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
