// !bin/node
const path = require('path');
const fs = require('fs-extra');
const entities = [
  'Plan',
  'Suscription',
  'Contract',
  'Administrator',
  'User',
  'Role',
  'Client',
  'Asistence',
  'Activity',
  'Asset',
  'Ficha',
];

const template = (name) => {
  return `
  import { WellnessEntity } from '../base/base.entity';
  import { Entity } from 'typeorm';
  import { ObjectType } from '@nestjs/graphql';
  import { DeepPartial } from '@wellness/common';
  /**
   * @description
   */
  @Entity()
  @ObjectType()
  export class ${name} extends WellnessEntity {
    constructor(input: DeepPartial<${name}>) {
      super(input);
    }
  }
`;
};

const createEntities = () => {
  for (const entity of entities) {
    const directory = entity.toLocaleLowerCase();
    const route = path.resolve('./', directory);
    fs.ensureDirSync(route);
    const content = template(entity);
    fs.writeFileSync(route.concat(`/${directory}.entity.ts`), content, 'utf-8');
  }
};

createEntities();
