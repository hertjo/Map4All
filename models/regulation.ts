import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { RegulationClass } from "./regulationClass";
import { Enactment } from "./enactment";

@Entity("massnahme")
export class Regulation {
    @PrimaryGeneratedColumn({ name: "massnahmenID" })
    public id: number;

    @Column()
    public info: string;

    @Column({ name: "spezDatum" })
    public specDate: Date;

    @Column({ name: "erlassID" })
    public enactmentId: number;

    @OneToOne(() => Enactment, (enactment: Enactment) => enactment.id, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ name: "erlassID" })
    public enactment: Enactment;

    @Column({ name: "klassenID" })
    public regulationClassId: number;

    @OneToOne(() => RegulationClass, (regulationClass: RegulationClass) => regulationClass.id, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ name: "klassenID" })
    public regulationClass: RegulationClass;
}