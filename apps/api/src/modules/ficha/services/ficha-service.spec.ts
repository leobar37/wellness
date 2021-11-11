import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coreEntitiesMap } from '@wellness/core';
import { Test, TestingModule } from '@nestjs/testing';
import { EventBusModule } from '@wellness/core/event-bus';
import { Ficha, DetailFicha } from '@wellness/core';
import { EntityManager, getManager } from 'typeorm';
import { FichaService } from './ficha.service';
import { FichaModule } from '../ficha.module';
import * as faker from 'faker';
import { FichaInput } from '../dto/ficha.input';

const createFicha = (closed: boolean) => {
  return new Ficha({
    closed,
  });
};

const createDetail = (fichaId: number, open: boolean) => {
  return new DetailFicha({
    fichaId: fichaId,
    note: faker.lorem.paragraph(4),
    open,
    objective: faker.lorem.paragraph(5),
    weight: faker.datatype.number(80),
  });
};

describe('test ficha service', () => {
  let app: INestApplication;
  let module: TestingModule;
  let manager: EntityManager;
  let fichaService: FichaService;

  beforeAll(async () => {
    const _module = await Test.createTestingModule({
      imports: [
        FichaModule,
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
    fichaService = _module.get(FichaService);
    await app.init();
    module = _module;
  });

  beforeEach(async () => {
    manager = getManager();
  });

  describe('Test ficha service', () => {
    let ficha: Ficha;
    test('open  ficha', async () => {
      const fichaCreated = await fichaService.openAndCloseFicha({
        fichaId: null,
        note: faker.lorem.paragraph(5),
        objective: faker.lorem.paragraph(4),
        weight: faker.datatype.number(100),
      });
      ficha = fichaCreated;
      expect(fichaCreated.details.length).toBe(1);
      expect(fichaCreated.closed).not.toBeTruthy();
    });
    test('close ficha', async () => {
      const fichaUpdated = await fichaService.openAndCloseFicha({
        fichaId: ficha.id,
        note: faker.lorem.paragraph(5),
        objective: faker.lorem.paragraph(4),
        weight: faker.datatype.number(100),
      });
      expect(fichaUpdated).not.toBeNull();
      //   expect(fichaUpdated.details.length).toBe(2);
      //   expect(fichaUpdated.closed).toBeTruthy();
    });
  });

  afterAll(() => {
    app.close();
  });
});
