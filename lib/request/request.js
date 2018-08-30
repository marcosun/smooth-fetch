import isNode from 'detect-node';
import nodeFetch from 'node-fetch';
import oneLine from 'common-tags/lib/oneLine';

// Assign fetch function based on environemnt
let fetch;
if (isNode === true) { // Running in Node
  fetch = nodeFetch;
} else { // Running in browser
  fetch = window.fetch;
}

export default async function request(path = '', apiOptions = {}) {
  // Filter and throw error if path declared in an anti-pattern format.
  if (/(^http)|(\.)|(:\d+)/.test(path)) {
    return Promise.reject(oneLine`
      path should not contain any one of protocol, domain or port,
      please look at path and apiOptions.baseUrl for reference.
    `);
  }

  const {
    url,
    options,
  } = this.requestInterceptor(path, this.defaultOptions, apiOptions);

  const response = await fetch(url, options);

  return this.responseInterceptor(response);
}
