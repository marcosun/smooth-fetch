import fetch from './fetch';

test('Throw error if baseOptions is not an object', () => {
  const setOptions = fetch;

  expect(() => {
    setOptions(1);
  }).toThrow();

  expect(() => {
    setOptions('1');
  }).toThrow();
});

test('Throw error if resolver is not a function', () => {
  const setInterceptor = fetch();

  expect(() => {
    const interceptor = 1;
    setInterceptor(interceptor);
  }).toThrow();

  expect(() => {
    const interceptor = '1';
    setInterceptor(interceptor);
  }).toThrow();

  expect(() => {
    const interceptor = { a: 1 };
    setInterceptor(interceptor);
  }).toThrow();

  expect(() => {
    const interceptor = [1];
    setInterceptor(interceptor);
  }).toThrow();
});
