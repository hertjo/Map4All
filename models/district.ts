import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("landkreis")
export class District {
    @PrimaryGeneratedColumn({ name: "landkreisID" })
    public id: number;

    @Column()
    public name: string;
}