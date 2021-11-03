import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class PingResolver {
  @Query((type) => String)
  async ping(): Promise<string> {
    return 'Pong';
  }
}
