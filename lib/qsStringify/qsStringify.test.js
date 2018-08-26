import qsStringify from './qsStringify';

test('Throw error if queryFormatter is not a function', () => {
  const error = /^queryFormatter is not a function$/;

  expect(() => {
    qsStringify(null, 1);
  }).toThrow(error);

  expect(() => {
    qsStringify(null, 'string');
  }).toThrow(error);

  expect(() => {
    qsStringify(null, {});
  }).toThrow(error);

  expect(() => {
    qsStringify(null, []);
  }).toThrow(error);
});

test('Stringify empty object to empty string', () => {
  expect(qsStringify()).toBe('');
  expect(qsStringify({})).toBe('');
});

test('Stringify empty array to empty string', () => {
  expect(qsStringify([])).toBe('');
});

test('Stringify null to empty string', () => {
  expect(qsStringify(null)).toBe('');
});

test('Stringify object to string', () => {
  expect(qsStringify({ a: 1, b: 2 })).toBe('?a=1&b=2');
});

test('Stringify array to string', () => {
  expect(qsStringify([1, 2, 3])).toBe('?0=1&1=2&2=3');
});

test('Stringify object of arrays to string', () => {
  expect(qsStringify({ a: [1, 2, 3] })).toBe('?a%5B0%5D=1&a%5B1%5D=2&a%5B2%5D=3');
});

test('Stringify array of objects to string', () => {
  expect(qsStringify([{ a: 1 }, { b: 2 }])).toBe('?0%5Ba%5D=1&1%5Bb%5D=2');
});
