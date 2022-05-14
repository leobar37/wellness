import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IntervalTimeEnum } from '@wellness/common';

registerEnumType(IntervalTimeEnum, {
  name: 'Intervatime',
  description: 'The time interval for the report',
});

@InputType()
export class GrowthInput {
  @Field(() => IntervalTimeEnum)
  interval: IntervalTimeEnum;

  @Field(() => String)
  typeData: 'plans' | 'asistences';
}
