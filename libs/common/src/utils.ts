import { get, curry } from 'lodash';
import { SafeAny } from './';
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

export const pluck = <D extends unknown>(data: SafeAny, path: string): D => {
  return get(data, path) as D;
};
export const someBoolean = (...values: boolean[]) => values.some(Boolean);
