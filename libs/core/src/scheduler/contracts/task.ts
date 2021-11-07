import { Task } from '../Task';

export class FixedTask extends Task {
  suscriptionId: number;
  constructor(task: Partial<FixedTask>) {
    super(task);
  }
}

export class DinamicTask extends Task {
  contractId: number;
  constructor(task: Partial<DinamicTask>) {
    super(task);
  }
}
