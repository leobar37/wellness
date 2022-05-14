import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IntervalTimeEnum } from '@wellness/common';
registerEnumType(IntervalTimeEnum, {
  name: 'IntervaltimeEnum',
  description: 'The time interval for the report',
});

export enum TypeDataEnum {
  plans = 'plans',
  asistences = 'asistences',
  register_clients = 'register_clients',
}

registerEnumType(TypeDataEnum, {
  name : 'TypeDataEnum', 
  description : 'The type of data for the report',
})

@InputType()
export class GrowthInput {
  @Field(() => IntervalTimeEnum)
  interval: IntervalTimeEnum;

  @Field(() => TypeDataEnum )
  typeData: TypeDataEnum;
}
