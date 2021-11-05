
  import { WellnessEntity } from '../base/base.entity';
  import { Entity } from 'typeorm';
  import { ObjectType } from '@nestjs/graphql';
  import { DeepPartial } from '@wellness/common';
  /**
   * @description
   */
  @Entity()
  @ObjectType()
  export class Administrator extends WellnessEntity {
    constructor(input: DeepPartial<Administrator>) {
      super(input);
    }
  }
