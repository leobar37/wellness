import { get, curry, keys } from 'lodash';
import { SafeAny } from './';
import { TObject } from './shared-types';
import { isValid, isObject } from './shared-utils';
/**
 * A simple normalization for email addresses. Lowercases the whole address,
 * even though technically the local part (before the '@') is case-sensitive
 * per the spec. In practice, however, it seems safe to treat emails as
 * case-insensitive to allow for users who might vary the usage of
 * upper/lower case. See more discussion here: https://ux.stackexchange.com/a/16849
 */

export function normalizeEmailAddress(input: string): string {
  return input.trim().toLowerCase();
}

export const range = (start: number, end: number): number[] => {
  return new Array(end - start).fill(null).reduce(
    (prev, _curr) => {
      const last = prev[prev.length - 1];
      return [...prev, last + 1];
    },
    [start]
  );
};

export const pluck = <D extends unknown>(data: SafeAny, path: string): D => {
  return get(data, path) as D;
};
export const someBoolean = (...values: boolean[]) => values.some(Boolean);

export const _removeInvalids = <T extends unknown>(obj: TObject): T | null => {
  return obj
    ? (Object.keys(obj).reduce((pre, curr) => {
        const isVa = isValid(get(obj, curr));
        if (isVa) {
          return {
            ...pre,
            [curr]: get(obj, curr),
          };
        }
        return pre;
      }, {}) as T)
    : null;
};

export const removeInvalids = <T extends unknown>(obj: TObject): T | null => {
  let newObj = {};
  const isEmpty = Object.keys(newObj).length;
  if (isEmpty) {
    return null;
  }
  for (const key in obj) {
    const source = get(obj, key);
    const isVa = isValid(source);
    if (isObject(source) && isValid(source)) {
      const obj = removeInvalids(source);
      newObj = {
        ...newObj,
        [key]: obj,
      };
      continue;
    }
    if (isVa) {
      newObj = {
        ...newObj,
        [key]: source,
      };
    }
  }
  return newObj as T;
};
