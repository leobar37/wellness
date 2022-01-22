import { OnModuleDestroy, Type } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { SafeAny } from '@wellness/common';
import * as scheduler from 'node-schedule';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { Task } from './Task';

export abstract class Scheduler implements OnModuleDestroy {
  protected destroy$ = new Subject<void>();
  notifierStream$ = new Subject<Task>();

  constructor(private schedule: SchedulerRegistry) {}
  register = new Map<Task, SafeAny>();

  onModuleDestroy(): SafeAny {
    this.destroy$.next();
    this.destroy$.complete();
  }
  protected onTasks(tasks: Task[]) {
    for (const task of tasks) {
      this.onTask(task);
    }
  }

  cancelTask(task: Task) {
    const callback = this.register.get(task);
    scheduler.cancelJob(callback);
  }

  protected onTask(task: Task) {
    const callback = () => {
      this.notifierStream$.next(task);
    };
    this.register.set(task, callback);
    // see : http://crontab.org/
  }

  ofType<T extends Task>(type: Type<T>): Observable<T> {
    return this.notifierStream$.asObservable().pipe(
      takeUntil(this.destroy$),
      filter((task) => (task as SafeAny).constructor === type)
    ) as Observable<T>;
  }
}
