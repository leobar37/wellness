import { Task } from './Task';
import * as scheduler from 'node-schedule';
import { OnModuleDestroy } from '@nestjs/common';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { Type } from '@nestjs/common';
import { SafeAny } from '@wellness/common';

export abstract class Scheduler implements OnModuleDestroy {
  private destroy$ = new Subject<void>();
  notifierStream$ = new Subject<Task>();

  taks: Task[] = [];
  // this method is called when application is started
  // it is useful if you want prepare tasks
  // when the application start
  abstract onInit(): void;

  onModuleDestroy(): SafeAny {
    this.destroy$.next();
    this.destroy$.complete();
  }
  protected onTasks(tasks: Task[]) {
    for (const task of tasks) {
      this.onTask(task);
    }
  }

  protected onTask(task: Task) {
    this.taks.push(task);
    scheduler.scheduleJob(task.endDate, () => {
      this.notifierStream$.next(task);
    });
  }

  ofType<T extends Task>(type: Type<T>): Observable<T> {
    return this.notifierStream$.asObservable().pipe(
      takeUntil(this.destroy$),
      filter((task) => (task as SafeAny).constructor === type)
    ) as Observable<T>;
  }
}
