import requestUrl from './requestUrl';

test('Undefined baseUrl and path', async () => {
  const baseUrl = '';
  const path = '';
  const result = '';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Defined baseUrl with undefined path', async () => {
  const baseUrl = 'http://ip:port';
  const path = '';
  const result = 'http://ip:port';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Undefined baseUrl with defined path', async () => {
  const baseUrl = '';
  const path = 'login';
  const result = 'login';

  expect(requestUrl(baseUrl, path)).toBe(result);
});
