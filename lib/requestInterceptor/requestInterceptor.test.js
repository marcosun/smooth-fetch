import requestInterceptor from './requestInterceptor';

test('Parse body of an non-empty object', () => {
  const path = '';
  const defaultOptions = {};
  const apiOptions = {
    method: 'POST',
    body: {
      name: 'Kevin',
    },
  };
  const previousInterceptorResult = {};

  const result = {
    url: '',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '{"name":"Kevin"}',
    },
  };

  expect(requestInterceptor(
    path,
    defaultOptions,
    apiOptions,
    previousInterceptorResult,
  )).toEqual(result);
});

test('Parse body undefined', () => {
  const path = '';
  const defaultOptions = {};
  const apiOptions = {
    method: 'POST',
  };
  const previousInterceptorResult = {};

  const result = {
    url: '',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': void 0,
      },
    },
  };

  expect(requestInterceptor(
    path,
    defaultOptions,
    apiOptions,
    previousInterceptorResult,
  )).toEqual(result);
});

test('previousInterceptorResult has higher priority', () => {
  const path = '';
  const defaultOptions = {
    headers: {
      Cookie: 'MD5',
    },
  };
  const apiOptions = {
    method: 'POST',
    body: {
      name: 'Kevin',
    },
  };
  const previousInterceptorResult = {
    headers: {
      Cookie: 'MD6',
    },
    body: 123,
  };

  const result = {
    url: '',
    options: {
      method: 'POST',
      headers: {
        Cookie: 'MD6',
        'Content-Type': 'text/plain',
      },
      body: '123',
    },
  };

  expect(requestInterceptor(
    path,
    defaultOptions,
    apiOptions,
    previousInterceptorResult,
  )).toEqual(result);
});


test('Although user defined headers has the highest priority', () => {
  const path = '';
  const defaultOptions = {
    headers: {
      Cookie: 'MD4',
    },
  };
  const apiOptions = {
    method: 'POST',
    headers: {
      Cookie: 'MD5',
    },
    body: {
      name: 'Kevin',
    },
  };
  const previousInterceptorResult = {
    headers: {
      Cookie: 'MD6',
    },
  };

  const result = {
    url: '',
    options: {
      method: 'POST',
      headers: {
        Cookie: 'MD5',
        'Content-Type': 'application/json',
      },
      body: '{"name":"Kevin"}',
    },
  };

  expect(requestInterceptor(
    path,
    defaultOptions,
    apiOptions,
    previousInterceptorResult,
  )).toEqual(result);
});

test('url and options from previousInterceptorResult have no effect', () => {
  const path = '';
  const defaultOptions = {};
  const apiOptions = {
    method: 'POST',
    headers: {
      Cookie: 'MD5',
    },
    body: {
      name: 'Kevin',
    },
  };
  const previousInterceptorResult = {
    url: '/login',
    options: {
      method: 'POST',
      headers: {
        Cookie: 'MD6',
        'Content-Type': 'text/plain',
      },
      body: '123',
    },
  };

  const result = {
    url: '',
    options: {
      method: 'POST',
      headers: {
        Cookie: 'MD5',
        'Content-Type': 'application/json',
      },
      body: '{"name":"Kevin"}',
    },
  };

  expect(requestInterceptor(
    path,
    defaultOptions,
    apiOptions,
    previousInterceptorResult,
  )).toEqual(result);
});
