/**
 * difference arrarys
 */
export function difference<T>(array: T[], values: T[]): T[] {
  return array.filter((item) => !values.some((value) => value === item));
}
