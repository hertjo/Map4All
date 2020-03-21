import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("bundesland")
export class State {
    @PrimaryGeneratedColumn({ name: "bundeslandID" })
    public id: number;

    @Column()
    public name: string;
}