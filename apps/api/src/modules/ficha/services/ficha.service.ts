import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DetailFicha, Ficha } from '@wellness/core';
import { EntityNotFoundError } from '@wellness/core/common/error';
import { isNull, isUndefined } from 'lodash';
import { EntityManager } from 'typeorm';
import { FichaInput } from '../dto/ficha.input';
@Injectable()
export class FichaService {
  // create  a ficha

  constructor(@InjectEntityManager() private manager: EntityManager) {}

  public async openAndCloseFicha(inputFicha: FichaInput) {
    let ficha: Ficha | null = null;
    if (isNull(inputFicha.fichaId) || isUndefined(inputFicha.fichaId)) {
      console.log(inputFicha.clientId);
      ficha = this.manager.create(
        Ficha,
        new Ficha({
          clientId: inputFicha.clientId,
        })
      );
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
    ficha.closed = true;
    ficha.details.push(closeDetail);
    ficha = await this.manager.save(Ficha, ficha);

    return ficha;
  }

  public async updateFicha(inputFicha: FichaInput) {
    const ficha = await this.manager
      .createQueryBuilder(Ficha, 'ficha')
      .innerJoinAndSelect('ficha.details', 'details')
      .where('ficha.id = :fichaId', { fichaId: inputFicha.fichaId })
      .getOne();
    const open = inputFicha.open;
    if (ficha) {
      throw new EntityNotFoundError('Ficha', inputFicha.fichaId);
    }
    const detail = ficha.details.find((detail) => detail.open === open);
    if (detail) {
      throw new EntityNotFoundError('DetailFicha', detail.id);
    }
    detail.weight = inputFicha.weight;
    detail.note = inputFicha.note;
    detail.objective = inputFicha.objective;
    await this.manager.save(DetailFicha, detail);
    return ficha;
  }
}
