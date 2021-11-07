import { SafeAny } from '@wellness/common';

export enum STATETASK {
  FINISHED,
  PENNDING,
  STARTED,
}
export abstract class Task {
  constructor(input: Partial<Task>) {
    for (const [key, value] of Object.entries(input)) {
      (this as SafeAny)[key] = value;
    }
  }

  endDate: Date;

  state: STATETASK;

  // when a task is completed this method is called
}
