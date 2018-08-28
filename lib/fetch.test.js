import fetch from './fetch';
import oneLine from 'common-tags/lib/oneLine';

test('Throw error if baseOptions is not an object', () => {
  const injectOptions = fetch;

  const error = /^baseOptions is not an object$/;

  expect(() => {
    injectOptions(1);
  }).toThrow(error);

  expect(() => {
    injectOptions('string');
  }).toThrow(error);
});

test('Throw error if requestInterceptor is not a function', () => {
  const injectInterceptor = fetch();

  const error = /^requestInterceptor is not a function$/;

  expect(() => {
    const requestInterceptor = 1;
    injectInterceptor(requestInterceptor);
  }).toThrow(error);

  expect(() => {
    const requestInterceptor = 'string';
    injectInterceptor(requestInterceptor);
  }).toThrow(error);

  expect(() => {
    const requestInterceptor = {};
    injectInterceptor(requestInterceptor);
  }).toThrow(error);

  expect(() => {
    const requestInterceptor = [];
    injectInterceptor(requestInterceptor);
  }).toThrow(error);
});

test('Throw error if responseInterceptor is not a function', () => {
  const injectInterceptor = fetch();

  const error = /^responseInterceptor is not a function$/;

  expect(() => {
    const responseInterceptor = 1;
    injectInterceptor(void 0, responseInterceptor);
  }).toThrow(error);

  expect(() => {
    const responseInterceptor = 'string';
    injectInterceptor(void 0, responseInterceptor);
  }).toThrow(error);

  expect(() => {
    const responseInterceptor = {};
    injectInterceptor(void 0, responseInterceptor);
  }).toThrow(error);

  expect(() => {
    const responseInterceptor = [];
    injectInterceptor(void 0, responseInterceptor);
  }).toThrow(error);
});

test('Validate path to be a string which should not contain any one of protocol, domain or port', async () => {
  expect.assertions(3);

  const request = fetch()();

  const errorContent = oneLine`
    path should not contain any one of protocol, domain or port,
    please look at path and apiOptions.baseUrl for reference.
  `;
  const error = new RegExp(`^${errorContent}$`);

  try {
    await request('http://domain:8000/path/to/resource');
  } catch (e) {
    expect(e).toMatch(error);
  }

  try {
    await request('domain:8000/path/to/resource');
  } catch (e) {
    expect(e).toMatch(error);
  }

  try {
    await request('some.domain.name/path/to/resource');
  } catch (e) {
    expect(e).toMatch(error);
  }
});
