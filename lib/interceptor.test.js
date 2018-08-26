import interceptor from './interceptor';

test('Throw error if response status code is not 2XX', async () => {
  expect.assertions(1);

  try {
    await interceptor({ ok: false });
  } catch (e) {
    expect(e).toEqual({ ok: false });
  }
});
