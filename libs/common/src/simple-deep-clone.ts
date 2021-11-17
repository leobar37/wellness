import { SafeAny } from '.';
import { isClassInstance } from './shared-utils';
import { TObject } from './shared-types';

/**
 * An extremely fast function for deep-cloning an object which only contains simple
 * values, i.e. primitives, arrays and nested simple objects.
 */
export function simpleDeepClone<
  T extends string | number | SafeAny[] | TObject
>(input: T): T {
  // if not array or object or is null return self
  if (typeof input !== 'object' || input === null) {
    return input;
  }
  let output: SafeAny;
  let i: number | string;
  // handle case: array
  if (input instanceof Array) {
    let l: SafeAny;
    output = [] as SafeAny[];
    for (i = 0, l = input.length; i < l; i++) {
      output[i] = simpleDeepClone(input[i]);
    }
    return output;
  }
  if (isClassInstance(input)) {
    return input;
  }
  // handle case: object
  output = {};
  for (i in input) {
    // eslint-disable-next-line no-prototype-builtins
    if ((input as SafeAny).hasOwnProperty(i)) {
      output[i] = simpleDeepClone((input as SafeAny)[i]);
    }
  }
  return output;
}
