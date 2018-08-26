import interceptor from './interceptor';

test('Throw error if response status code is not 2XX', async () => {
  expect.assertions(1);

  const response = {
    headers: {
      get: () => {
        return 'application/json';
      },
    },
    ok: false,
    json: () => {
      return {};
    },
  };

  try {
    await interceptor(response);
  } catch (e) {
    expect(e).toEqual({});
  }
});
