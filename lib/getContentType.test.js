import getContentType from './getContentType';

test('Handle undefined and null', () => {
  const result = void 0;

  expect(getContentType(void 0)).toBe(result);

  expect(getContentType(null)).toBe(result);
});

test('Handle empty object', () => {
  const result = void 0;

  expect(getContentType({})).toBe(result);
});

test('Handle object', () => {
  const result = 'application/json';

  expect(getContentType({ a: 1 })).toBe(result);
});

test('Handle text', () => {
  const result = 'text/plain';

  expect(getContentType('string')).toBe(result);
  expect(getContentType(1)).toBe(result);
  expect(getContentType(true)).toBe(result);
});
