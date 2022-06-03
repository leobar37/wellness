import { WellnessEntity } from '../base/base.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { DeepPartial, Sex, ModeRegiser } from '@wellness/common';
import { User } from '../user/user.entity';
import { Asistence } from '../asistence/asistence.entity';
import { Asset } from '../asset/asset.entity';
import { Contract } from '../contract/contract.entity';
import { HasNote } from '@wellness/common';
import { Ficha } from '../ficha/ficha.entity';

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
export class Client extends WellnessEntity implements HasNote {
  constructor(input: DeepPartial<Client>) {
    super(input);
  }

  @Column({ nullable: true })
  photoId: number;

  @JoinColumn()
  @Field((type) => Asset, { nullable: true })
  @OneToOne((type) => Asset, { onDelete: 'CASCADE' })
  photo: Promise<Asset>;

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

  @Column('timestamp', { nullable: true })
  @Field((type) => Date, { nullable: true })
  birth: Date;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  direction: string;

  @Column('text', { nullable: true })
  note: string;

  @Column('varchar')
  @Field((type) => Sex)
  sex: Sex;

  @Column({
    type: 'enum',
    enum: ModeRegiser,
    default: ModeRegiser.ADMIN,
  })
  @Field((type) => ModeRegiser)
  mode: ModeRegiser;

  @OneToOne((type) => User, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  user: User;

  // asistences
  @OneToMany((type) => Asistence, (asistence) => asistence.client)
  asistences: Promise<Asistence[]>;

  @OneToMany((type) => Contract, (contract) => contract.client)
  contracts: Promise<Contract[]>;

  @OneToMany((type) => Ficha, (ficha) => ficha.client)
  fichas: Promise<Ficha[]>;

  @Field((type) => Ficha, { nullable: true })
  currentFicha: Promise<Ficha>;
}
