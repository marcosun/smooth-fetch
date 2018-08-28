import requestInterceptor from './requestInterceptor';

test('Parse body type equal to an non-empty object', async () => {
  const path = '';
  const baseOptions = {};
  const apiOptions = {
    method: 'POST',
    body: {
      name: 'Kevin',
    },
  };

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

  expect(requestInterceptor(path, baseOptions, apiOptions)).toEqual(result);
});

test('Parse body undefined', async () => {
  const path = '';
  const baseOptions = {};
  const apiOptions = {
    method: 'POST',
  };

  const result = {
    url: '',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': void 0,
      },
    },
  };

  expect(requestInterceptor(path, baseOptions, apiOptions)).toEqual(result);
});

test('User defined Content-Type has higher priority', async () => {
  const path = '';
  const baseOptions = {};
  const apiOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html',
    },
  };

  const result = {
    url: '',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html',
      },
    },
  };

  expect(requestInterceptor(path, baseOptions, apiOptions)).toEqual(result);
});

test('User defined headers shall preserve', async () => {
  const path = '';
  const baseOptions = {};
  const apiOptions = {
    method: 'POST',
    headers: {
      Cookie: 'MD5',
    },
    body: {
      name: 'Kevin',
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

  expect(requestInterceptor(path, baseOptions, apiOptions)).toEqual(result);
});
