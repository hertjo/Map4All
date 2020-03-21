import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("bundeslandliste")
export class State {
    @PrimaryGeneratedColumn({ name: "bundeslandID" })
    public id: number;

    @Column({ name: "bundesland" })
    public name: string;
}