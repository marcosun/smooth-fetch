import requestContentType from './requestContentType';

test('Handle undefined and null', () => {
  const result = void 0;

  expect(requestContentType(void 0)).toBe(result);

  expect(requestContentType(null)).toBe(result);
});

test('Handle empty object', () => {
  const result = void 0;

  expect(requestContentType({})).toBe(result);
});

test('Handle object', () => {
  const result = 'application/json';

  expect(requestContentType({ a: 1 })).toBe(result);
});

test('Handle text', () => {
  const result = 'text/plain';

  expect(requestContentType('string')).toBe(result);
  expect(requestContentType(1)).toBe(result);
  expect(requestContentType(true)).toBe(result);
});
