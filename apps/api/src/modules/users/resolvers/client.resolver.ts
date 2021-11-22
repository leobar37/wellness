import { Resolver, Mutation, Query, Args, ID } from '@nestjs/graphql';
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
  // find clients
  @Query((type) => [Client])
  async clients() {
    return this.clientService.findAll();
  }
  // update client
  @Mutation((type) => Client)
  async updateCLient(
    @Args('id', { type: () => ID }) id: number,
    @Args('input', { type: () => ClientInput }) input: ClientInput
  ) {
    return this.clientService.update(id, input);
  }
  // delete client
  @Mutation((type) => Client)
  async deleteCLient(@Args('id', { type: () => ID }) id: number) {
    return this.clientService.delete(id);
  }

  @Query((type) => Client)
  client(@Args('id', { type: () => ID }) id: number) {
    return this.clientService.findOne(id);
  }
}
