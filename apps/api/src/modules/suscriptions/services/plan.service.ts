import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Plan } from '@wellness/core/entity';
import { EventBus, SuscriptionEvent } from '@wellness/core/event-bus';
import { PlanInput } from '../dto/plan.input';
import { EntityManager, Repository } from 'typeorm';
import { CRUD, ModeSuscription, omit } from '@wellness/common';
import { Suscription, Contract } from '@wellness/core';
import {
  BussinessError,
  EntityNotFoundError,
} from '@wellness/core/common/error';
import { ContractInput } from '../dto/contract.input';
@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan) private repository: Repository<Plan>,
    @InjectEntityManager() private manager: EntityManager,
    private eventBus: EventBus
  ) {}
  async createPlan(input: PlanInput) {
    const plan = new Plan(omit(input, ['duration']));

    const suscription = await this.manager.save(
      Suscription,
      new Suscription({
        active: true,
        duration: input.duration,
        mode: ModeSuscription.DINAMIC,
      })
    );

    plan.suscription = suscription;

    const planSaved = await this.repository.save(plan);
    this.eventBus.publish(
      new SuscriptionEvent({
        operation: CRUD.CREATE,
        source: planSaved,
      })
    );
    return planSaved;
  }
  private async existPlan(id: number) {
    const plan = await this.repository.findOne(id);
    if (!plan) {
      throw new EntityNotFoundError('Plan', id);
    }
    return plan;
  }
  async deletePLan(id: number) {
    const plan = await this.existPlan(id);
    await this.repository.delete(id);
    this.eventBus.publish(
      new SuscriptionEvent({
        operation: CRUD.DELETE,
        source: plan,
      })
    );
    return plan;
  }

  async test() {
    return this.repository.find({});
  }

  public async clientHaveAPlanActive(clientId: number) {
    const result = await this.manager
      .createQueryBuilder(Plan, 'plan')
      .innerJoin('plan.suscription', 'sub')
      .innerJoin('sub.contracts', 'contract')
      .where('contract.clientId = :clientId', {
        clientId: clientId,
      })
      .andWhere('contract.finished = :finish', {
        finish: false,
      })
      .printSql()
      .getCount();

    return result > 0;
  }

  async afiliatePLan(contractInput: ContractInput) {
    // verify if client have a active plan
    const haveAPLan = await this.clientHaveAPlanActive(contractInput.clientId);

    if (haveAPLan) {
      throw new BussinessError('El cliente ya esta afiliado a un plan');
    }
    const contract = await this.manager.save(
      Contract,
      new Contract({
        clientId: contractInput.clientId,
        suscriptionId: contractInput.suscriptionId,
        paid: contractInput.paid,
        note: contractInput.note,
        price: contractInput.price,
      })
    );
    return contract;
  }
}
