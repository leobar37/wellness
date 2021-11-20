import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coreEntitiesMap } from '@wellness/core';
import { Test, TestingModule } from '@nestjs/testing';
import { EventBusModule } from '@wellness/core/event-bus';
import { EntityManager, getManager } from 'typeorm';
import { AssetsModule } from '../assets.module';

const assets = [''];

describe('test plan service', () => {
  let app: INestApplication;
  let module: TestingModule;
  let manager: EntityManager;
  beforeAll(async () => {
    const _module = await Test.createTestingModule({
      imports: [
        AssetsModule,
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
    await app.init();
    module = _module;
  });

  beforeEach(async () => {
    manager = getManager();
  });

  afterAll(() => {
    app.close();
  });
});
