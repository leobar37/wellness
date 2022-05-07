/* eslint-disable @typescript-eslint/ban-types */
import { SafeAny } from '.';

export function isObject(item: SafeAny): item is object {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function isClassInstance(item: SafeAny): boolean {
  return isObject(item) && item.constructor.name !== 'Object';
}

export function isValid(source: SafeAny) {
  return source != null && source != undefined;
}

export const isDev = process.env.NODE_ENV === 'development';
