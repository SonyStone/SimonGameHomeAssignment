import { getRandomNumberInRange } from './getRandomNumberInRange';

describe('getRandomNumberInRange', () => {
  it('returns a number within the specified range', () => {
    const min = 1;
    const max = 10;
    const result = getRandomNumberInRange(min, max);

    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it('returns a number within the max range', () => {
    const min = -Number.MAX_SAFE_INTEGER;
    const max = Number.MAX_SAFE_INTEGER;
    const result = getRandomNumberInRange(min, max);

    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});
