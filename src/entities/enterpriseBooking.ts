import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EnterPriseClient } from "./enterPriseClient";
import { Tblagent } from "./Tblagent";

@Entity("enterpriseBooking", { schema: "public" })
export class EnterpriseBooking {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("timestamp without time zone", {
        name: "bookingDate"
    })
    bookingDate: Date;

    @Column("integer", { name: "hours", nullable: true })
    hours: number;

    @Column("timestamp without time zone", {
        name: "bookingStartDateTime",
    })
    bookingStartDateTime: Date;

    @Column("timestamp without time zone", {
        name: "bookingEndDateTime",
    })
    bookingEndDateTime: Date;


    @Column("character varying", {
        name: "address1",
        length: 500,
    })
    address1: string;

    @Column("character varying", {
        name: "address2",
        nullable: true,
        length: 500,
    })
    address2: string | null;

    @Column("double precision", {
        name: "latitude",
    })
    latitude: string;

    @Column("double precision", {
        name: "longitude",
    })
    longitude: string

    @Column("integer", { name: "bookingstatusid" })
    bookingstatusid: number;


    @ManyToOne(() => EnterPriseClient, (client) => client.id, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "clientId" })
    clientId: EnterPriseClient;

    @ManyToOne(() => Tblagent, (agent) => agent.id, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "agentId" })
    agentId: Tblagent;

    @Column("integer", {
        name: "clientrating",
        nullable: true,
    })
    clientrating: number | null;

    @Column("integer", {
        name: "agentrating",
        nullable: true,
    })
    agentrating: number | null;

    @Column("integer", { name: "speciality" })
    speciality: number;


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

    @CreateDateColumn({ type: "timestamp without time zone" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp without time zone" })
    updatedAt: Date;


    @Column("character varying", { name: "head", nullable: true, length: 100 })
    head: string | null;

    @Column("character varying", { name: "message", nullable: true, length: 500 })
    message: string | null;


    @Column("character varying", {
        name: "medialink",
        nullable: true,
        length: 200,
        default: () => "''",
    })
    medialink: string | null;
}
