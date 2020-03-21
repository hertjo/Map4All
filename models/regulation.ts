import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Regulation {
    @PrimaryGeneratedColumn()
    public id: number;
}