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

// Run each interceptors by order and feed the next interceptor with
// the result from the previous interceptor.
function callRequestInterceptors(interceptors, path, defaultOptions, apiOptions) {
  return interceptors.reduce((previousInterceptorResult, interceptor) => {
    return interceptor(path, defaultOptions, apiOptions, previousInterceptorResult);
  }, {});
}

// Run each interceptors by order and feed the next interceptor with
// the result from the previous interceptor.
function callResponseInterceptors(interceptors, response) {
  return interceptors.reduce((previousInterceptorResult, interceptor) => {
    return interceptor(response, previousInterceptorResult);
  }, void 0);
}

export default async function request(path = '', apiOptions = {}) {
  // Filter and throw error if path declared in an anti-pattern format.
  if (/(^http)|(\.)|(:\d+)/.test(path)) {
    return Promise.reject(new Error(oneLine`
      Request path should not contain any one of protocol, domain or port,
      please look at path and apiOptions.baseUrl for details.
    `));
  }

  if (Object(apiOptions) !== apiOptions) {
    return Promise.reject(new Error('Request apiOptions must be an object.'));
  }

  const requestInterceptors = [
    ...this.interceptors.requestInterceptorsBeforeMain,
    this.interceptors.mainRequestInterceptor,
    ...this.interceptors.requestInterceptorsAfterMain,
  ];

  const {
    url,
    options,
  } = callRequestInterceptors(requestInterceptors, path, this.defaultOptions, apiOptions);

  const response = await fetch(url, options);

  const responseInterceptors = [
    ...this.interceptors.responseInterceptorsBeforeMain,
    this.interceptors.mainResponseInterceptor,
    ...this.interceptors.responseInterceptorsAfterMain,
  ];

  return callResponseInterceptors(responseInterceptors, response);
}
