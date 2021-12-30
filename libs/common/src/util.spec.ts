import { someBoolean } from './utils';
describe('Test function files', () => {
  test('Some boolean', () => {
    expect(someBoolean([true, false])).toBe(true);
    expect(someBoolean([false, false])).toBe(false);
  });
});
