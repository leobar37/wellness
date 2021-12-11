import { Query } from '@nestjs/graphql';
import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
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
  @Mutation((type) => Ficha)
  public async updateFicha(@Args('input') ficha: FichaInput) {
    return this.fichaService.updateFicha(ficha);
  }

  @Query((type) => Ficha, { nullable: true })
  public async getFicha(@Args('userId', { type: () => Int }) userId: number) {
    return this.fichaService.getFicha(userId);
  }
  @Query((type) => [Ficha], { nullable: true })
  public async getFichas(@Args('userId', { type: () => Int }) userId: number) {
    return this.fichaService.getFichas(userId);
  }
}
