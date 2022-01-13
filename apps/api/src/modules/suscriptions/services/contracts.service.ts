import { EntityManager, FindManyOptions } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ContractView } from '../view';
import { FiContractsView } from '../dto/filters.input';
import { isValid } from '@wellness/common';
@Injectable()
export class ContractsViewService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}
  async getContractView(filters: FiContractsView) {
    const findOptions = {} as FindManyOptions;
    if (isValid(filters?.clientId)) {
      findOptions.where = {
        clientId: filters.clientId,
      };
    }
    return this.manager.find(ContractView, findOptions);
  }
}
