import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Enactment } from "./enactment";
import { RegulationClass } from "./regulationClass";

@Entity("massnahme")
export class Regulation {
    @PrimaryGeneratedColumn({ name: "massnahmenID" })
    public id: number;

    @Column()
    public info: string;

    @Column({ name: "spezDatum" })
    public specDate: Date;

    @ManyToOne(() => Enactment, (enactment: Enactment) => enactment.id)
    @Column({ name: "erlassID" })
    public enactmentId: number;

    @OneToMany(() => RegulationClass, (regulationClass: RegulationClass) => regulationClass.id)
    @Column({ name: "klassenID" })
    public regulationClassId: number;
}