import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { pays } from './pays';

@Entity()
export class continent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Field()
    code: string;

    @Column()
    @Field()
    nom: string;

    @Field()
    @ManyToOne(() => pays)
    @JoinColumn({ name: 'pays_id' })
    pays: pays;
}
