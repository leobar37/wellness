import { Resolver, Mutation, Query, Args, ID, Context } from '@nestjs/graphql';
import { Client } from '@wellness/core/entity';
import { Req } from '@nestjs/common';
import { ClientInput } from '../dto/client.input';
import { ClientService } from '../services/client.service';
import { Auth } from '../../../common';
import { Role } from '@wellness/common';
@Resolver()
export class ClientResolver {
  constructor(private clientService: ClientService) {}
  // register client
  @Mutation((type) => Client)
  @Auth(Role.STAFF, Role.ADMIN)
  async registerClient(
    @Args('client', { type: () => ClientInput }) client: ClientInput
  ) {
    return this.clientService.createClient(client);
  }
  // delete client
  // find clients
  @Auth(Role.STAFF, Role.ADMIN)
  @Query((type) => [Client])
  async clients() {
    return this.clientService.findAll();
  }
  // update client
  @Auth(Role.STAFF, Role.ADMIN)
  @Mutation((type) => Client)
  async updateCLient(
    @Args('id', { type: () => ID }) id: number,
    @Args('input', { type: () => ClientInput }) input: ClientInput
  ) {
    return this.clientService.update(id, input);
  }

  // delete client
  @Auth(Role.ADMIN)
  @Mutation((type) => Client)
  async deleteCLient(@Args('id', { type: () => ID }) id: number) {
    return this.clientService.delete(id);
  }

  @Query((type) => Client)
  @Auth(Role.STAFF, Role.ADMIN)
  async client(@Args('id', { type: () => ID }) id: number) {
    return this.clientService.findOne(id);
  }
}
