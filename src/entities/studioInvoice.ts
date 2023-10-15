import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Tblagent } from "./Tblagent";
import StudioClient from "./studioClient";

@Entity("studioinvoice", { schema: "public" })
export default class StudioInvoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    currency: string;

    @Column({nullable:true})
    subject: string;

    @Column({default:"Draft"})
    status: string;

    @Column("jsonb", { default: {} })
    invoiceDetails: object;

    @Column({nullable:true})
    subTotalAmount: Number;

    @Column({nullable:true})
    totalAmount: Number;

    @Column({nullable:true})
    discount: Number;

    @Column({nullable:true})
    tax: Number;

    @Column({nullable:true})
    notes: string;

    @Column({nullable:true})
    paymentDue: Date;

    @Column({nullable:true})
    dueOnReceipt: Date;

    @ManyToOne(() => StudioClient, (client) => client.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "clientId" })
    clientId: StudioClient;

    @ManyToOne(() => Tblagent, (agent) => agent.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "agentId" })
    createdBy;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;
}
