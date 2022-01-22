import { ObjectType, registerEnumType, Field } from '@nestjs/graphql';
import { DeepPartial, Role } from '@wellness/common';
import { Column, Entity } from 'typeorm';
import { WellnessEntity } from '../base/base.entity';
/**
 * @description
 */

registerEnumType(Role, {
  name: 'Role',
  description: 'Describe the role of a administrator',
});
@Entity()
@ObjectType()
export class Administrator extends WellnessEntity {
  constructor(input: DeepPartial<Administrator>) {
    super(input);
  }

  @Column({ nullable: true })
  @Field((type) => String)
  name: string;

  @Column({ nullable: true })
  @Field((type) => String)
  lastName: string;

  @Column({
    unique: true,
  })
  @Field((type) => String)
  email: string;

  @Column({ nullable: true })
  @Field((type) => String)
  description: string;

  // this is a temporal toke wich serves to validate user before be converted into a user
  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  temportalToken: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  verified: boolean;

  @Column({ type: 'varchar' })
  @Field((type) => Role)
  rol: Role;
}
