import { EntityManager, FindConditions, FindManyOptions } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ContractView } from '../view';
import { FiContractsView } from '../dto/filters.input';
import { isValid, SafeAny, ServiceType } from '@wellness/common';
import { ContractEditInput } from '../dto/contract.input';
import { Contract, EntityNotFoundError } from '@wellness/core';
import { removeInvalids } from '@wellness/common';
Injectable();
export class ContractsViewService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}
  async getContractView(filters: FiContractsView) {
    const findOptions = {} as FindManyOptions;
    if (isValid(filters?.clientId)) {
      findOptions.where = {
        clientId: filters.clientId,
      };
    }

    switch (true) {
      case isValid(filters?.type): {
        const isPlan = filters.type == ServiceType.plan;
        findOptions.where = {
          ...(findOptions.where as SafeAny),
          planId: isPlan ? filters.serviceId : undefined,
          activityId: !isPlan ? filters.serviceId : undefined,
        } as FindConditions<ContractView>;
      }
    }
    const options = removeInvalids(findOptions);
    console.log('with options', options);

    const result = await this.manager.find(ContractView, options);
    console.log(result);

    return result;
  }
  // delete a contract

  // update a contract
  async editContract(input: ContractEditInput) {
    const contract = await this.manager.findOne(Contract, input.contractId);
    if (!contract) {
      throw new EntityNotFoundError('Contract', contract.id);
    }
    await this.manager.update(Contract, contract.id, {
      paid: input.paid,
      price: input.price,
      note: input.note,
    });
    return this.manager.findOne(ContractView, {
      where: {
        contractId: contract.id,
      },
    });
  }

  async deleteContract(id: number) {
    const contract = await this.manager.findOne(ContractView, {
      where: {
        contractId: id,
      },
    });
    if (!contract) {
      throw new EntityNotFoundError('Contract', id);
    }
    await this.manager.delete(Contract, id);
    return contract;
  }
}