import { Scheduler } from '../Scheduler';
import { Contract, Suscription } from '@wellness/core/entity';
import { DinamicTask, FixedTask } from './task';
import { STATETASK } from '../Task';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ModeSuscription } from '@wellness/common';
import { takeUntil } from 'rxjs/operators';
@Injectable()
export class ContractsScheduler extends Scheduler implements OnModuleInit {
  constructor(@InjectEntityManager() private manager: EntityManager) {
    super();
  }
  onModuleInit() {
    this.initializeTasks();
    this.initListenEvents();
  }

  private initListenEvents() {
    this.ofType(DinamicTask)
      .pipe(takeUntil(super.destroy$))
      .subscribe(async (task) => {
        await this.manager.update(Contract, task.contractId, {
          finished: true,
        });
      });
    this.ofType(FixedTask)
      .pipe(takeUntil(super.destroy$))
      .subscribe(async (task) => {
        // TODO: Use a transaction here ->
        const sub = await this.manager.findOne(Suscription, {
          where: {
            id: task.suscriptionId,
          },
        });
        // desactive subscription
        this.manager.update(Suscription, sub.id, {
          active: false,
        });

        const contracts = await sub.contracts;
        for (const contract of contracts) {
          await this.manager.update(Contract, contract.id, {
            finished: true,
          });
          // TODO:
          // - lauch a notification here
        }
      });
  }

  private async initializeTasks() {
    const suscriptions = await this.manager.find(Suscription, {});
    suscriptions.forEach(async (sub) => {
      const isFixed = sub.mode == ModeSuscription.FIXED;
      if (isFixed) {
        this.addFixedTask(sub);
      } else {
        const contracts = await sub.contracts;
        for (const contract of contracts) {
          if (!contract.finished) {
            this.addDinamicTask(contract);
          }
        }
      }
    });
  }

  // this dinamic
  addDinamicTask(contract: Contract) {
    this.onTask(
      new DinamicTask({
        contractId: contract.id,
        endDate: contract.finishedAt,
        state: STATETASK.STARTED,
      })
    );
  }
  addFixedTask(suscription: Suscription) {
    this.onTask(
      new FixedTask({ state: STATETASK.STARTED, suscriptionId: suscription.id })
    );
  }
}
