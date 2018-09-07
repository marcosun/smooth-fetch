import request from './request';
import oneLine from 'common-tags/lib/oneLine';

test('path should not contain any one of protocol, domain or port', async () => {
  // TODO: How to throw error? throw new error || return Promise.reject
  // expect.assertions(3);

  // const errorContent = oneLine`
  //   path should not contain any one of protocol, domain or port,
  //   please look at path and apiOptions.baseUrl for reference.
  // `;
  // const error = new RegExp(`^${errorContent}$`);

  // try {
  //   await request('http://domain:8000/path/to/resource');
  // } catch (e) {
  //   expect(e).toMatch(error);
  // }

  // try {
  //   await request('domain:8000/path/to/resource');
  // } catch (e) {
  //   expect(e).toMatch(error);
  // }

  // try {
  //   await request('some.domain.name/path/to/resource');
  // } catch (e) {
  //   expect(e).toMatch(error);
  // }
});
