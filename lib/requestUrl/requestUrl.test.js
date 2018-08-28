import requestUrl from './requestUrl';

test('Undefined baseUrl and path', () => {
  const baseUrl = '';
  const path = '';
  const result = '';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Relative baseUrl with undefined path', () => {
  const baseUrl = 'api';
  const path = '';
  const result = 'api';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Undefined baseUrl with relative path', () => {
  const baseUrl = '';
  const path = 'login';
  const result = 'login';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Absolute baseUrl with undefined path', () => {
  const baseUrl = 'api/';
  const path = '';
  const result = 'api/';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Undefined baseUrl with absolute path', () => {
  const baseUrl = '';
  const path = '/login';
  const result = '/login';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Relative baseUrl with absolute path', () => {
  const baseUrl = 'api';
  const path = '/login';
  const result = 'api/login';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Absolute baseUrl with relative path', () => {
  const baseUrl = 'api/';
  const path = 'login';
  const result = 'api/login';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Relative baseUrl with relative path', () => {
  const baseUrl = 'api';
  const path = 'login';
  const result = 'api/login';

  expect(requestUrl(baseUrl, path)).toBe(result);
});

test('Absolute baseUrl with absolute path', () => {
  const baseUrl = 'api/';
  const path = '/login';
  const result = 'api/login';

  expect(requestUrl(baseUrl, path)).toBe(result);
});
