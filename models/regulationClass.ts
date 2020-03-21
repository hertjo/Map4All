import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("massnahmenklasse")
export class RegulationClass {
    @PrimaryGeneratedColumn({ name: "massnahmenID" })
    public id: number;

    @Column()
    public type: string;
}