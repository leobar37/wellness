import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class DeleteAssetInput {
  @Field((type) => ID)
  id: number;

  @Field((type) => Boolean)
  isMultiple: boolean;
}
