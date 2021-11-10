import { SafeAny } from '@wellness/common';
import { CronJob } from 'cron';

export enum STATETASK {
  FINISHED,
  PENNDING,
  STARTED,
}
export abstract class Task extends CronJob {
  cronTimer: Date;
  state: STATETASK;

  // when a task is completed this method is called
}
