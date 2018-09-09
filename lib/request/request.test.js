import request from './request';

test('path should not contain any one of protocol, domain or port', async () => {
  expect.assertions(3);

  try {
    await request('http://domain:8000/path/to/resource');
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
  }

  try {
    await request('domain:8000/path/to/resource');
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
  }

  try {
    await request('some.domain.name/path/to/resource');
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
  }
});
