import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Plan } from '@wellness/core/entity';
import {
  ContractEvent,
  EventBus,
  SuscriptionEvent,
} from '@wellness/core/event-bus';
import { PlanInput } from '../dto/plan.input';
import { EntityManager, Repository } from 'typeorm';
import { CRUD, ModeSuscription, omit } from '@wellness/common';
import { Suscription, Contract } from '@wellness/core';
import { PlanHelper } from '../helpers/plan.helper';
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
    private eventBus: EventBus,
    private planHelper: PlanHelper
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

    plan.suscription = Promise.resolve(suscription);

    const planSaved = await this.repository.save(plan);
    this.eventBus.publish(
      new SuscriptionEvent({
        operation: CRUD.CREATE,
        source: planSaved,
      })
    );
    return planSaved;
  }
  async updatePlan(id: number, input: PlanInput) {
    const plan = await this.existPlan(id);
    await this.repository.update(plan.id, {
      detail: input.detail,
      visible: input.visible,
    });
    const sub = await plan.suscription;
    await this.manager.update(Suscription, sub.id, {
      duration: input.duration,
      active: input.active,
    });
    return this.repository.findOne(plan.id);
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

  async joinPlan(contractInput: ContractInput) {
    // verify if client have a active plan
    const haveAPLan = await this.planHelper.clientHaveAPlanActive(
      contractInput.clientId
    );
    if (haveAPLan) {
      throw new BussinessError('El cliente ya esta afiliado a un plan');
    }

    const plan = await this.repository.findOne({
      where: {
        id: contractInput.planId,
      },
    });
    const sub = await plan.suscription;
    const contract = await this.manager.save(
      Contract,
      new Contract({
        clientId: contractInput.clientId,
        suscriptionId: sub.id,
        paid: contractInput.paid,
        note: contractInput.note,
        price: contractInput.price,
      })
    );
    this.eventBus.publish(
      new ContractEvent({
        source: contract,
        operation: CRUD.CREATE,
        planOrActivity: plan,
      })
    );
    return contract;
  }

  // find plans
  public async findPlans() {
    const plans = await this.repository.find({});
    return plans;
  }

  // TODO: add date filter
  public async findPlansByClient(idClient: number) {
    const plans = await this.repository
      .createQueryBuilder('plan')
      .innerJoin('plan.suscription', 'sub')
      .innerJoin('sub.contracts', 'contract')
      .where('contract.clientId = :clientId', {
        clientId: idClient,
      })
      .printSql()
      .getMany();
    return plans;
  }

  public async getPlan(id: number) {
    return this.repository.findOne(id);
  }
}
