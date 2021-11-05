import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { WellnessEntity } from '../base/base.entity';
import { DeepPartial } from '@wellness/common';
import { AssetBoot } from '../asset/relation-asset.entity';
import { Ficha } from './ficha.entity';
@Entity()
export class DetailFicha extends WellnessEntity {
  constructor(input: DeepPartial<DetailFicha>) {
    super(input);
  }

  @Column('float', { nullable: true })
  weight: number;

  @Column('text')
  objective: string;

  @Column('text', { nullable: true })
  note: string;

  @Column('boolean', { default: false })
  open: boolean;

  @OneToOne((type) => AssetBoot, { eager: true, cascade: true })
  @JoinColumn()
  asset: AssetBoot;

  @Column()
  fichaId: number;

  @ManyToOne((type) => Ficha, (ficha) => ficha.details)
  ficha: Promise<Ficha>;
}
