import { InputType, Field, registerEnumType } from '@nestjs/graphql';

export enum TypeDataAlert {
  birthday = 'birthday',
  plans_to_overcome = 'plans_to_overcome',
}

registerEnumType(TypeDataAlert, {
  name: 'TypeDataAlertEnum',
  description: 'The type of data for the Alert report',
});
@InputType()
export class AlertInput {
  @Field(() => TypeDataAlert)
  typeData: TypeDataAlert;
}
