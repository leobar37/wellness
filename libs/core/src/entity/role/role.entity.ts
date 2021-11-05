
  import { WellnessEntity } from '../base/base.entity';
  import { Entity } from 'typeorm';
  import { ObjectType } from '@nestjs/graphql';
  import { DeepPartial } from '@wellness/common';
  /**
   * @description
   */
  @Entity()
  @ObjectType()
  export class Role extends WellnessEntity {
    constructor(input: DeepPartial<Role>) {
      super(input);
    }
  }
