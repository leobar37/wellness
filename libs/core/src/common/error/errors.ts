import { ApolloError } from 'apollo-server-express';
import { coreEntitiesMap } from '../../entity';
import { ID } from '@wellness/common';
import { WellnessApolloError } from './base';
export class EntityNotFoundError extends WellnessApolloError {
  constructor(entityName: keyof typeof coreEntitiesMap, id: ID) {
    super(`la entidad ${entityName} no existe`, 'ENTITY_NOT_FOUND');
  }
}

export class BussinessError extends WellnessApolloError {
  constructor(message: string) {
    super(message, 'BUSINESS_ERROR');
  }
}
