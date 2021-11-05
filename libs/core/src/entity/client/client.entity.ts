import { WellnessEntity } from '../base/base.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { DeepPartial, Sex, ModeRegiser } from '@wellness/common';
import { User } from '../user/user.entity';
import { Asistence } from '../asistence/asistence.entity';
import { Asset } from '../asset/asset.entity';
import { Contract } from '../contract/contract.entity';
registerEnumType(Sex, {
  name: 'Sex',
});

registerEnumType(ModeRegiser, {
  name: 'ModeRegiser',
});
/**
 * @description
 */
@Entity()
@ObjectType()
export class Client extends WellnessEntity {
  constructor(input: DeepPartial<Client>) {
    super(input);
  }

  @OneToOne((type) => Asset, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  photo: Asset;

  @Column()
  @Field()
  code: string;

  @Column()
  @Field()
  dni: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  lastName: string;

  @Column('date')
  @Field((type) => Date)
  birth: Date;

  @Column()
  @Field((type) => Date)
  phone: string;

  @Column()
  @Field()
  direction: string;

  @Column()
  note: string;

  @Column('varchar')
  @Field((type) => Sex)
  sex: Sex;

  @Column('varchar')
  @Field((type) => ModeRegiser)
  mode: ModeRegiser;

  @OneToOne((type) => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  // asistences
  @OneToMany((type) => Asistence, (asistence) => asistence.client)
  asistences: Promise<Asistence[]>;

  @OneToMany((type) => Contract, (contract) => contract.client)
  contracts: Promise<Contract[]>;
}