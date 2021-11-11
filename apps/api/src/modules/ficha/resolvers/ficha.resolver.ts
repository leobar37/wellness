import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Ficha } from '@wellness/core';
import { FichaInput } from '../dto/ficha.input';
import { FichaService } from '../services/ficha.service';
@Resolver()
export class FichaResolver {
  constructor(private fichaService: FichaService) {}
  @Mutation((type) => Ficha)
  openAndCloseFicha(
    @Args('input', { type: () => FichaInput }) ficha: FichaInput
  ) {
    return this.fichaService.openAndCloseFicha(ficha);
  }
}
