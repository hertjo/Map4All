import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
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

    @ManyToOne(() => State, (state: State) => state.id)
    @Column({ name: "bundeslandID" })
    public state: string;

    @ManyToOne(() => District, (district: District) => district.id)
    @Column({ name: "landkreisID" })
    public district: string;
}