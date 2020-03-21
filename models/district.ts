import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("landkreisliste")
export class District {
    @PrimaryGeneratedColumn({ name: "landkreisID" })
    public id: number;

    @Column({ name: "landkreis" })
    public name: string;
}