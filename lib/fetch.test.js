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
  const injectInterceptors = fetch();

  const error = /^requestInterceptor is not a function$/;

  expect(() => {
    const requestInterceptor = 1;
    injectInterceptors(requestInterceptor);
  }).toThrow(error);

  expect(() => {
    const requestInterceptor = 'string';
    injectInterceptors(requestInterceptor);
  }).toThrow(error);

  expect(() => {
    const requestInterceptor = {};
    injectInterceptors(requestInterceptor);
  }).toThrow(error);

  expect(() => {
    const requestInterceptor = [];
    injectInterceptors(requestInterceptor);
  }).toThrow(error);
});

test('Throw error if responseInterceptor is not a function', () => {
  const injectInterceptors = fetch();

  const error = /^responseInterceptor is not a function$/;

  expect(() => {
    const responseInterceptor = 1;
    injectInterceptors(void 0, responseInterceptor);
  }).toThrow(error);

  expect(() => {
    const responseInterceptor = 'string';
    injectInterceptors(void 0, responseInterceptor);
  }).toThrow(error);

  expect(() => {
    const responseInterceptor = {};
    injectInterceptors(void 0, responseInterceptor);
  }).toThrow(error);

  expect(() => {
    const responseInterceptor = [];
    injectInterceptors(void 0, responseInterceptor);
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
