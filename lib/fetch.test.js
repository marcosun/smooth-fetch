import fetch from './fetch';
import { oneLine } from 'common-tags';

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

test('Validate path is a string does not contains protocol, domain or port', () => {
  const request = fetch()();

  const errorContent = oneLine`
    Path does not accept protocol://domain:port,
    please look at baseOptions.baseUrl for details
  `;
  const error = new RegExp(`^${errorContent}$`);

  expect(() => {
    request('http://domain:8000/path/to/resource');
  }).toThrow(error);

  expect(() => {
    request('domain:8000/path/to/resource');
  }).toThrow(error);

  expect(() => {
    request('some.domain.name/path/to/resource');
  }).toThrow(error);
});
