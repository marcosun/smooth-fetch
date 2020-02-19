import responseInterceptor from './responseInterceptor';

test('Throw error if response status code is not 2XX', async () => {
  expect.assertions(1);

  const response = {
    headers: {
      get: () => {
        return 'application/json';
      },
    },
    json: () => {
      return {};
    },
    ok: false,
  };

  try {
    await responseInterceptor(response);
  } catch (e) {
    expect(e).toEqual({
      ...response,
      data: {},
    });
  }
});

test('Status code 204 returns undefined', async () => {
  expect.assertions(1);

  const response = {
    headers: {
      get: () => {},
    },
    ok: true,
    status: 204,
  };

  expect(await responseInterceptor(response)).toEqual({
    ...response,
    data: void 0,
  });
});
