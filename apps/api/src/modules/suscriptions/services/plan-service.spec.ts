import { PlanService } from './plan.service';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coreEntitiesMap } from '@wellness/core';
import { Test, TestingModule } from '@nestjs/testing';
import { EventBusModule } from '@wellness/core/event-bus';
import { PlanModule } from '../plan.module';
import { Client, Plan, Suscription } from '@wellness/core/entity';
import * as faker from 'faker';
import { ModeSuscription, Sex } from '@wellness/common';
import { EntityManager, getManager } from 'typeorm';
import { parseDeleteResult } from '@wellness/core';
import { BussinessError } from '@wellness/core/common/error';
import { PlanHelper } from '../helpers/plan.helper';
const createUser = () => {
  return new Client({
    name: faker.name.firstName(0),
    lastName: faker.name.lastName(0),
    birth: faker.date.past(15),
    dni: '987654321',
    note: faker.lorem.paragraph(2),
    phone: faker.phone.phoneNumber(),
    code: '105020',
    sex: Sex.MEN,
    email: faker.internet.email(),
  });
};

const createPLan = () => {
  return new Plan({
    detail: {
      name: 'Plan' + faker.datatype.number(10),
      description: faker.lorem.words(3),
      price: faker.datatype.number(150),
    },
    visible: true,
  });
};

describe('test plan service', () => {
  let app: INestApplication;
  let planService: PlanService;
  let planHelper: PlanHelper;
  let module: TestingModule;
  let manager: EntityManager;
  beforeAll(async () => {
    const _module = await Test.createTestingModule({
      imports: [
        PlanModule,
        TypeOrmModule.forRoot({
          password: 'alfk3458',
          username: 'leobar37',
          type: 'postgres',
          host: 'localhost',
          database: 'wellness',
          port: 5432,
          entities: [...Object.values(coreEntitiesMap)],
          synchronize: true,
        }),
        EventBusModule,
      ],
      providers: [],
    }).compile();

    app = _module.createNestApplication();
    planService = _module.get<PlanService>(PlanService);
    planHelper = _module.get<PlanHelper>(PlanHelper);
    await app.init();
    module = _module;
  });

  beforeEach(async () => {
    manager = getManager();
  });

  describe('Afilite plan test', () => {
    let suscription: Suscription;
    let plan: Plan;
    let client: Client;
    test('user is created', async () => {
      // create a client
      client = await manager.save(Client, createUser());
      expect(client).not.toBeNull();
    });
    test('plan is created ', async () => {
      plan = await manager.save(Plan, createPLan());
      expect(plan).not.toBeNull();
      const planPreSaved = await manager.find(Plan, {
        where: {
          id: plan.id,
        },
      });
      expect(planPreSaved).not.toBeNull();
    });

    test('created a suscription', async () => {
      suscription = await manager.save(
        Suscription,
        new Suscription({
          active: true,
          mode: ModeSuscription.DINAMIC,
          duration: 30,
        })
      );
      expect(suscription).not.toBeNull();
    });

    test('add suscription to a plan', async () => {
      const res = await manager.update(Plan, plan.id, {
        suscription: suscription,
      });
      expect(parseDeleteResult(res)).toBeTruthy();
    });

    test('client is not afiliate to a plan', async () => {
      const res = await planHelper.clientHaveAPlanActive(client.id);
      expect(res).not.toBeTruthy();
    });
    test('contract is register for a user', async () => {
      const contract = await planService.joinPlan({
        clientId: client.id,
        planId: plan.id,
        note: faker.lorem.words(2),
        paid: false,
        price: 50,
      });
      expect(contract).not.toBeNull();
    });

    test('The user cannot register for a plan', async () => {
      await expect(
        planService.joinPlan({
          clientId: client.id,
          planId: plan.id,
          note: faker.lorem.words(2),
          paid: false,
          price: 50,
        })
      ).rejects.toThrow(BussinessError);
    });
  });

  afterAll(() => {
    app.close();
  });
});
