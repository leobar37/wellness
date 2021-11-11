import { Injectable } from '@nestjs/common';
import { FichaInput } from '../dto/ficha.input';
import { omit, Omit } from '@wellness/common';
import { isNull } from 'lodash';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Ficha, DetailFicha } from '@wellness/core';
@Injectable()
export class FichaService {
  // create  a ficha

  constructor(@InjectEntityManager() private manager: EntityManager) {}

  public async openAndCloseFicha(inputFicha: FichaInput) {
    let ficha: Ficha | null = null;
    if (isNull(inputFicha.fichaId)) {
      ficha = this.manager.create(Ficha, new Ficha({}));
      ficha = await this.manager.save(ficha);

      const openDetail = new DetailFicha({
        weight: inputFicha.weight,
        note: inputFicha.note,
        objective: inputFicha.objective,
        fichaId: ficha.id,
      });

      const openDetailSaved = await this.manager.save(DetailFicha, openDetail);
      ficha.details = [openDetailSaved];
      return ficha;
    }

    ficha = await this.manager
      .createQueryBuilder(Ficha, 'ficha')
      .innerJoinAndSelect('ficha.details', 'details')
      .where('ficha.id = :fichaId', { fichaId: inputFicha.fichaId })
      .getOne();

    const closeDetail = new DetailFicha({
      open: false,
      ...inputFicha,
    });

    ficha.details.push(closeDetail);
    ficha = await this.manager.save(Ficha, ficha);

    return ficha;
  }
}
