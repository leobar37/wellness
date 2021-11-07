import { Scheduler } from '../Scheduler';
import { Contract, Suscription } from '@wellness/core/entity';
import { DinamicTask, FixedTask } from './task';
import { STATETASK } from '../Task';
class ContractsScheduler extends Scheduler {
  onInit(): void {
    // super.onTasks();
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
