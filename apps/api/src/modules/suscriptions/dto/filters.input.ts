import { InputType, Field, ID } from '@nestjs/graphql';

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

@InputType()
export class FiContractsView {
  @Field((type) => ID, { nullable: true })
  clientId?: boolean;
}
