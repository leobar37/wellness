import { WellnessConfig, PartialWellnessConfig } from './Wellness-config';
import {
  simpleDeepClone,
  isObject,
  SafeAny,
  isClassInstance,
} from '@wellness/common';

export const mergeConfig = <T extends WellnessConfig>(
  target: T,
  source: PartialWellnessConfig,
  depth = 0
) => {
  if (!source) {
    return target;
  }
  if (depth === 0) {
    return simpleDeepClone(target);
  }
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      const evaluate: SafeAny = (source as SafeAny)[key];
      if (isObject(evaluate)) {
        // if (!(target as SafeAny)[key]) {
        //   Object.assign(target as SafeAny, { [key]: {} });
        // }
        if (!isClassInstance(evaluate)) {
          mergeConfig((target as SafeAny)[key], evaluate, depth + 1);
        } else {
          (target as SafeAny)[key] = evaluate;
        }
      } else {
        Object.assign(target, { [key]: evaluate });
      }
    }
  }
  return target;
};
