import {  ObjectType , Field } from "@nestjs/graphql";
import { TypeDataAlert } from "../dto/alert.dto";

@ObjectType()
export class AlertResult {
    @Field(() => TypeDataAlert)
    typeData: TypeDataAlert;
    @Field()
    label: string;
    @Field()
    sublabel: string;
    @Field(type => Date)
    date: Date;
    @Field()
    dateLabel: string;
}