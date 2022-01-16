import { InputType, Field, ID } from '@nestjs/graphql';
import { ServiceType } from '@wellness/common';

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

  @Field((type) => ID, { nullable: true })
  serviceId: boolean;

  @Field((type) => ServiceType, { nullable: true })
  type: ServiceType;
}
