import fetch from './fetch';

test('Throw error if baseOptions is not an object', () => {
  const injectOptions = fetch;

  const error = /^baseOptions is not an object$/;

  expect(() => {
    injectOptions(1);
  }).toThrow(error);

  expect(() => {
    injectOptions('1');
  }).toThrow(error);
});

test('Throw error if resolver is not a function', () => {
  const injectInterceptor = fetch();

  const error = /^resolver is not a function$/;

  expect(() => {
    const interceptor = 1;
    injectInterceptor(interceptor);
  }).toThrow(error);

  expect(() => {
    const interceptor = '1';
    injectInterceptor(interceptor);
  }).toThrow(error);

  expect(() => {
    const interceptor = { a: 1 };
    injectInterceptor(interceptor);
  }).toThrow(error);

  expect(() => {
    const interceptor = [1];
    injectInterceptor(interceptor);
  }).toThrow(error);
});
