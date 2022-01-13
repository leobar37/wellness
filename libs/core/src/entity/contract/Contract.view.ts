import { ViewEntity, ViewColumn } from 'typeorm';
import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { isValid, ServiceType } from '@wellness/common';

registerEnumType(ServiceType, {
  description: 'Type of the service (plan, activity)',
  name: 'ServiceType',
});

@ViewEntity({
  expression: `
     SELECT 
     cli.id as "clientId",
     sub.id as "suscriptionId",
     contr.id as "contractId",
     contr.note as "note",
     contr.finished as "finished",
     contr."createdAt"as "createdAt",
     contr.paid as "paid",
     contr."finishedAt" as "finishedAt",
     pl."detailName" as "planName",
     pl.id as "planId",
     act.id as "activityId",
     act."detailName" as "activityName",
     pl."detailPrice" as "planPrice",
     act."detailPrice" as "activityPrice"
     FROM public.contract as contr
     INNER JOIN  public.client as cli on contr."clientId" = cli.id 
     INNER JOIN  public.suscription as sub on sub.id = contr."suscriptionId"
     LEFT JOIN  public.activity as act on act."suscriptionId" = sub.id 
     LEFT JOIN  public.plan as pl on pl."suscriptionId" = sub.id
    `,
  name: 'contract_view',
})
@ObjectType({
  description: 'This is a view table for show a resume of contract',
})
export class ContractView {
  @Field((type) => ID)
  @ViewColumn()
  clientId: number;

  @Field((type) => ID)
  @ViewColumn()
  suscriptionId: number;

  @Field((type) => ID)
  @ViewColumn()
  contractId: number;

  @Field()
  @ViewColumn()
  note: string;

  @Field((type) => Boolean)
  @ViewColumn()
  finished: boolean;

  @Field((type) => Boolean)
  @ViewColumn()
  paid: boolean;

  @Field((type) => Date)
  @ViewColumn()
  createdAt: Date;

  @ViewColumn()
  @Field((type) => Date)
  finishedAt: Date;

  @ViewColumn()
  planName: string;

  @ViewColumn()
  planId: number;

  @ViewColumn()
  activityId: number;

  @ViewColumn()
  activityName: string;

  @ViewColumn()
  planPrice: number;

  @ViewColumn()
  activityPrice: string;

  // fields for resolve

  public isPlan() {
    return this.planId && isValid(this.planId);
  }
}
