const sum = (a, b) => a + b;

describe('Sample test', () => {
  test('sum(1,2) equals 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
