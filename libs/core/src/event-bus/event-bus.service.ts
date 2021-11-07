import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { WellnessEvent } from './events/base.event';
import { takeUntil, filter } from 'rxjs/operators';
import { SafeAny, Type } from '@wellness/common';

@Injectable()
export class EventBus implements OnModuleDestroy {
  private eventStream = new Subject<WellnessEvent>();
  private destroy$ = new Subject<void>();

  /**
   * @description
   * Publish an event which any subscribers can react to.
   */
  publish<T extends WellnessEvent>(event: T): void {
    this.eventStream.next(event);
  }

  /**
   * @description
   * Returns an RxJS Observable stream of events of the given type.
   */
  ofType<T extends WellnessEvent>(type: Type<T>): Observable<T> {
    return this.eventStream.asObservable().pipe(
      takeUntil(this.destroy$),
      filter((e) => (e as SafeAny).constructor === type)
    ) as Observable<T>;
  }

  onModuleDestroy(): SafeAny {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
