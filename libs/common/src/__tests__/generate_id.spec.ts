import { genID } from '../generate_id';

describe('genId test', () => {
  test('id  = 1', () => {
    expect(genID()).toBe(1);
  });

  test('id = 2', () => {
    expect(genID()).toBe(2);
  });
  test('id = 3', () => {
    expect(genID()).toBe(3);
  });
});
