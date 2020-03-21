import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("massnahmenklasse")
export class RegulationClass {
    @PrimaryGeneratedColumn({ name: "klassenID" })
    public id: number;

    @Column({ name: "massnahmentyp" })
    public type: string;
}