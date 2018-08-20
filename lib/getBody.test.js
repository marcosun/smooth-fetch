import getBody from './getBody';

test('Handle undefined and null', () => {
  const result = void 0;

  expect(getBody(void 0)).toBe(result);

  expect(getBody(null)).toBe(result);
});

test('Handle empty object', () => {
  const result = void 0;

  expect(getBody({})).toBe(result);
});

test('Handle object', () => {
  const result = '{"a":1}';

  expect(getBody({ a: 1 })).toBe(result);
});

test('Handle text', () => {
  expect(getBody('string')).toBe('string');
  expect(getBody(1)).toBe('1');
  expect(getBody(true)).toBe('true');
});
