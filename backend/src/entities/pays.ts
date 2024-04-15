import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";


@Entity()
export class pays {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Field()
    code: string;

    @Column()
    @Field()
    nom: string;

    @Column()
    @Field()
    emoji: string;
}
