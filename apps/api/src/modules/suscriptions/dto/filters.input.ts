import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FiltersPlan {
  @Field((type) => Boolean, { nullable: true })
  active?: boolean;
}

@InputType()
export class FiltersActivity {
  @Field((type) => Boolean, { nullable: true })
  active?: boolean;
}
