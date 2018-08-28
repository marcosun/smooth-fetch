import requestUrl from './requestUrl';

test('Undefined baseUrl and path', () => {
  const baseUrl = '';
  const path = '';
  const result = '';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Defined baseUrl with undefined path', () => {
  const baseUrl = 'http://ip:port';
  const path = '';
  const result = 'http://ip:port';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Undefined baseUrl with defined path', () => {
  const baseUrl = '';
  const path = 'login';
  const result = 'login';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Absolute baseUrl with defined path', () => {
  const baseUrl = '/';
  const path = 'login';
  const result = '/login';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Absolute baseUrl with absolute path', () => {
  const baseUrl = '/';
  const path = '/login';
  const result = '/login';

  expect(requestUrl(baseUrl, path)).toBe(result);
});
