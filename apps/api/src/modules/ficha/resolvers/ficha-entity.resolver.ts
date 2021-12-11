import { ResolveField, Resolver } from '@nestjs/graphql';
import { Ficha } from '@wellness/core/entity';

@Resolver((of) => Ficha)
export class FichaEntityResolver {}
