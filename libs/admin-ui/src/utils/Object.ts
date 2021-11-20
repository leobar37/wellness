import { SafeAny } from '@wellness/common';
import { get } from 'lodash';

export const matVa = <Val, T extends string | number | symbol>(
  val?: T,
  fallback?: SafeAny
) => {
  return (obj: Partial<Record<T, Val>>) => {
    if (!val) {
      return fallback || null;
    }
    const result = obj[val];
    if (!result) {
      return fallback || null;
    }
    return result;
  };
};
