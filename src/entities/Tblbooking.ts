import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tblclient } from "./Tblclient";

@Entity("tblbooking", { schema: "public" })
export class Tblbooking {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "bookingno",
    nullable: true,
    length: 20,
  })
  bookingno: string | null;

  @Column("timestamp without time zone", {
    name: "bookingdatetime",
    nullable: true,
  })
  bookingdatetime: Date | null;

  @Column("integer", { name: "session", nullable: true })
  session: number | null;

  @Column("timestamp without time zone", {
    name: "startdatetime",
    nullable: true,
  })
  startdatetime: Date | null;

  @Column("timestamp without time zone", {
    name: "enddatetime",
    nullable: true,
  })
  enddatetime: Date | null;

  @Column("character varying", {
    name: "shoottime",
    nullable: true,
    length: 50,
  })
  shoottime: string | null;

  @Column("character varying", {
    name: "address1",
    nullable: true,
    length: 500,
  })
  address1: string | null;

  @Column("character varying", {
    name: "address2",
    nullable: true,
    length: 500,
  })
  address2: string | null;

  @Column("double precision", {
    name: "latitude",
    nullable: true,
  })
  latitude: number | null;

  @Column("double precision", {
    name: "longitude",
    nullable: true,
  })
  longitude: number | null;

  @Column("integer", { name: "bookingstatusid", nullable: true })
  bookingstatusid: number | null;

  @ManyToOne(() => Tblclient, (client) => client.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "clientid" })
  clientid: number | null;

  @Column("integer", { name: "agentid", nullable: true })
  agentid: number | null;

  @Column("double precision", {
    name: "subtotal",
    nullable: true,
    default: () => "0",
  })
  subtotal: number | null;

  @Column("double precision", {
    name: "discount",
    nullable: true,
    default: () => "0",
  })
  discount: number | null;

  @Column("double precision", {
    name: "tax",
    nullable: true,
    default: () => "0",
  })
  tax: number | null;

  @Column("double precision", {
    name: "totalamount",
    nullable: true,
    default: () => "0",
  })
  totalamount: number | null;

  @Column("integer", {
    name: "clientrating",
    nullable: true,
    default: () => "0",
  })
  clientrating: number | null;

  @Column("integer", {
    name: "agentrating",
    nullable: true,
    default: () => "0",
  })
  agentrating: number | null;

  @Column("integer", { name: "speciality", nullable: true })
  speciality: number | null;

  @Column("character varying", {
    name: "mediacategories",
    nullable: true,
    length: 50,
  })
  mediacategories: string | null;

  @Column("character varying", {
    name: "paymentmode",
    nullable: true,
    length: 100,
  })
  paymentmode: string | null;

  @Column("character varying", {
    name: "paymentstatus",
    nullable: true,
    length: 100,
  })
  paymentstatus: string | null;

  @Column("character varying", {
    name: "transactionid",
    nullable: true,
    length: 100,
  })
  transactionid: string | null;

  @Column("character varying", {
    name: "agentcancellationreason",
    nullable: true,
    length: 500,
  })
  agentcancellationreason: string | null;

  @Column("character varying", {
    name: "clientcancellationreason",
    nullable: true,
    length: 500,
  })
  clientcancellationreason: string | null;

  @Column("double precision", {
    name: "cancellationfee",
    nullable: true,
    default: () => "0",
  })
  cancellationfee: number | null;

  @Column("double precision", {
    name: "refundamount",
    nullable: true,
    default: () => "0",
  })
  refundamount: number | null;

  @Column("boolean", {
    name: "isactive",
    nullable: true,
    default: () => "true",
  })
  isactive: boolean | null;

  @Column("timestamp without time zone", {
    name: "createdondate",
    nullable: true,
  })
  createdondate: Date | null;

  @Column("timestamp without time zone", {
    name: "updatedondate",
    nullable: true,
  })
  updatedondate: Date | null;

  @Column("timestamp without time zone", {
    name: "shootingstartdatetime",
    nullable: true,
  })
  shootingstartdatetime: Date | null;

  @Column("character varying", { name: "head", nullable: true, length: 100 })
  head: string | null;

  @Column("character varying", { name: "message", nullable: true, length: 500 })
  message: string | null;

  @Column("character varying", {
    name: "tiptransactionid",
    nullable: true,
    length: 100,
  })
  tiptransactionid: string | null;

  @Column("double precision", {
    name: "tipamount",
    nullable: true,
  })
  tipamount: number | null;

  @Column("character varying", {
    name: "medialink",
    nullable: true,
    length: 200,
    default: () => "''",
  })
  medialink: string | null;

  @Column("double precision", {
    name: "transportationcharge",
    nullable: true,
    default: () => "0",
  })
  transportationcharge: number | null;
}
