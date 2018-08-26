import requestBody from './requestBody';

test('Handle undefined and null', () => {
  const result = void 0;

  expect(requestBody(void 0)).toBe(result);

  expect(requestBody(null)).toBe(result);
});

test('Handle empty object', () => {
  const result = void 0;

  expect(requestBody({})).toBe(result);
});

test('Handle object', () => {
  const result = '{"a":1}';

  expect(requestBody({ a: 1 })).toBe(result);
});

test('Handle text', () => {
  expect(requestBody('string')).toBe('string');
  expect(requestBody(1)).toBe('1');
  expect(requestBody(true)).toBe('true');
});
