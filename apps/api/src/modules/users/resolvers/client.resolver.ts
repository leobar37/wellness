import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Client } from '@wellness/core/entity';
import { ClientInput } from '../dto/client.input';
import { ClientService } from '../services/client.service';
@Resolver()
export class ClientResolver {
  constructor(private clientService: ClientService) {}
  // register client
  @Mutation((type) => Client)
  async registerClient(
    @Args('client', { type: () => ClientInput }) client: ClientInput
  ) {
    return this.clientService.createClient(client);
  }
  // delete client
  // update client
}
