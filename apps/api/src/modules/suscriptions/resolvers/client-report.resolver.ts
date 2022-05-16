import {  Resolver , Query , ResolveField, Args , Parent, ID } from "@nestjs/graphql";
import { ClientReport , PlanProgress } from "../types/client-report.type";
import {  ClientReportService } from "../services/client-report.service";
@Resolver(type => ClientReport)
export class ClientReportResolver{
   constructor(private clientService : ClientReportService){
 
   }
    @Query(returns => ClientReport)
    async clientReport(@Args('clientId' ,{  type : () => ID}) clientId: number) {
     const client= new ClientReport();
      client.clientId = clientId;

      return client;
    }

    @ResolveField(returns => PlanProgress,{ nullable : true})
    async planProgress(@Parent() client: ClientReport) {
       return this.clientService.planProgress(client.clientId);
    }

}