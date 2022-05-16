import { DeleteResult } from 'typeorm';
import { Observable, Observer } from 'rxjs';
import { DeepPartial , SafeAny } from "@wellness/common";
export const parseDeleteResult = (result: DeleteResult) => {
  return result?.affected && result.affected >= 0;
};
/**
 *
 * @description
 *  Returns a observable wich executes a async work function and completes
 * with the returned values. This is useful in methods wich need to resturn an observable
 * but also want to work with async (Promise-returning) code.
 *
 */
export function asyncObservable<T>(
  work: (observer: Observer<T>) => Promise<T>
): Observable<T> {
  return new Observable((suscriber) => {
    (async () => {
      try {
        const result = await work(suscriber);
        if (result) {
          suscriber.next(result);
        }
        suscriber.complete();
      } catch (error) {
        suscriber.error(error);
      }
    })();
  });
}


export class Buildeable {
  constructor(input ?: DeepPartial<Buildeable> ){
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        (this as SafeAny)[key] = value;
      }
    }
  }
}
