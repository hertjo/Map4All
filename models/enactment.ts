import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { State } from "./state"
import { District } from "./district"

@Entity("erlass")
export class Enactment {
    @PrimaryGeneratedColumn({ name: "erlassID" })
    public id: number;

    @Column({ name: "erlassDatum" })
    public date: Date;

    @Column({ name: "startDatum" })
    public startDate: Date;

    @Column({ name: "endDatum" })
    public endDate: Date;

    @Column()
    public url: string;

    @Column({ name: "bundeslandID" })
    public stateId: number;

    @OneToOne(() => State, (state: State) => state.id, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ name: "bundeslandID" })
    public state: State;

    @Column({ name: "landkreisID" })
    public districtId: number;

    @OneToOne(() => District, (district: District) => district.id, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ name: "landkreisID" })
    public district: District;
}