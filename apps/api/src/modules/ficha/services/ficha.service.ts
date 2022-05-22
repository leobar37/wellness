import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Client, DetailFicha, Ficha } from '@wellness/core';
import { EntityNotFoundError } from '@wellness/core/common/error';
import { EntityManager } from 'typeorm';
import { FichaInput } from '../dto/ficha.input';
@Injectable()
export class FichaService {
  // create  a ficha

  constructor(@InjectEntityManager() private manager: EntityManager) {}

  public async openAndCloseFicha(inputFicha: FichaInput) {
    let ficha: Ficha | null = null;

    if (inputFicha.open) {
      ficha = await this.manager.save(
        Ficha,
        new Ficha({
          clientId: inputFicha.clientId,
        })
      );
      const openDetail = new DetailFicha({
        weight: inputFicha.weight,
        note: inputFicha.note,
        objective: inputFicha.objective,
        fichaId: ficha.id,
        assetId: inputFicha.assetId,
      });
      const openDetailSaved = await this.manager.save(DetailFicha, openDetail);
      ficha.details = Promise.resolve([openDetailSaved]);
      return ficha;
    }

    ficha = await this.manager
      .createQueryBuilder(Ficha, 'ficha')
      .innerJoinAndSelect('ficha.details', 'details')
      .where('ficha.id = :fichaId', { fichaId: inputFicha.fichaId })
      .getOne();

    if (!ficha) {
      throw new EntityNotFoundError('Ficha', inputFicha.fichaId);
    }
    const closeDetail = new DetailFicha({
      open: false,
      weight: inputFicha.weight,
      assetId: inputFicha.assetId,
      fichaId: inputFicha.fichaId,
      objective: inputFicha.objective,
    });
    const detail = await this.manager.save(DetailFicha, closeDetail);
    await this.manager.update(Ficha, ficha.id, {
      closed: true,
      closedAt: new Date(),
    });
    return this.manager.findOne(Ficha, ficha.id);
  }

  public async updateFicha(inputFicha: FichaInput, detailId: number) {
    const ficha = await this.manager.findOne(Ficha, inputFicha.fichaId);
    const open = inputFicha.open;
    if (!ficha) {
      throw new EntityNotFoundError('Ficha', inputFicha.fichaId);
    }
    const detail = await this.manager.findOne(DetailFicha, detailId);
    if (!detail) {
      throw new EntityNotFoundError('DetailFicha', detail.id);
    }
    detail.weight = inputFicha.weight;
    detail.note = inputFicha.note;
    detail.objective = inputFicha.objective;
    await this.manager.save(DetailFicha, detail);
    return ficha;
  }

  /**
   *
   * Return active ficha to user
   */

  public async getFicha(userId: number) {
    const user = await this.manager.findOne(Client, userId);
    if (!user) {
      throw new EntityNotFoundError('Client', userId);
    }
    const fichas = await this.manager.find(Ficha, {
      where: {
        clientId: user.id,
        closed: false,
      },
    });
    return fichas.length > 0 ? fichas[0] : null;
  }

  /**
   * Return all fichas for a user
   */
  public async getFichas(userId: number) {
    const user = await this.manager.findOne(Client, userId);
    if (!user) {
      throw new EntityNotFoundError('Client', userId);
    }
    const fichas = await this.manager.find(Ficha, {
      where: {
        clientId: user.id,
      },
    });
    return fichas;
  }
  /**
   *
   *
   */
  public async deleteFicha(fichaId: number) {
    const ficha = await this.manager.findOne(Ficha, fichaId);
    if (!ficha) {
      throw new EntityNotFoundError('Ficha', fichaId);
    }
    await this.manager.transaction(async (manager) => {
      await manager
        .createQueryBuilder(DetailFicha, 'ficha')
        .where('fichaId = :fichaId', { fichaId })
        .delete()
        .execute();
      await manager.delete(Ficha, fichaId);
    });
    return ficha;
  }
}
