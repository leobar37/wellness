import { someBoolean, range } from './utils';
describe('Test function files', () => {
  test('Some boolean', () => {
    expect(someBoolean([true, false])).toBe(true);
    expect(someBoolean([false, false])).toBe(false);
  });
  test('test rangue function', () => {
    expect(range(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
