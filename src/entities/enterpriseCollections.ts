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
import { EnterPriseClient } from "./enterPriseClient";
import { EnterpriseCollectionTags } from "./enterpriseCollectionTags";

export enum CollectionStatus {
  PUBLISH = "PUBLISH",
  HIDDEN = "HIDDEN",
}

@Entity("enterprisecollections", { schema: "public" })
export default class EnterpriseCollections {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  eventDate: Date;

  @Column({ unique: true, nullable: true })
  url!: string;

  @Column({ unique: true, nullable: true })
  slug!: string;

  @Column({
    type: "enum",
    enum: CollectionStatus,
    default: CollectionStatus.HIDDEN,
  })
  status: CollectionStatus;

  @ManyToMany(() => EnterpriseCollectionTags, (tags) => tags.id, {
    cascade: true,
  })
  @JoinTable({ name: "enterprisecollection_tag_join" })
  tags: EnterpriseCollectionTags[];

  @Column({ default: false })
  socialSharing: boolean;

  @Column({ nullable: true })
  password: string;

  @Column({ type: "boolean", default: false })
  download: boolean;

  @Column({ nullable: true })
  downloadPin: string;

  @Column({ nullable: true, default: 0 })
  photos: number;
  @Column({ nullable: true, default: 0 })
  videos: number;

  @Column({
    nullable: true,
    default: "https://snape-buckets.b-cdn.net/collectionphoto.jpg",
  })
  coverPhoto: string;

  @Column({
    type: "float",
    default: 0,
    nullable: true,
  })
  size: number;

  @ManyToOne(() => EnterPriseClient, (client) => client.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "clientId" })
  createdBy: EnterPriseClient;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
