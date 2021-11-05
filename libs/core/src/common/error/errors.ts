import { ApolloError } from 'apollo-server-express';
import { coreEntitiesMap } from '../../entity';
import { ID } from '@wellness/common';
export class EntityNotFoundError extends ApolloError {
  constructor(entityName: keyof typeof coreEntitiesMap, id: ID) {
    super(`la entidad ${entityName} no existe`, 'ENTITY_NOT_FOUND');
  }
}
