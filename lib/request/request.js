import isNode from 'detect-node';
import nodeFetch from 'node-fetch';
import oneLine from 'common-tags/lib/oneLine';
import filterUndefinedHeaders from './filterUndefinedHeaders';
import isObject from '../util/isObject';
import sequentialReduce from '../util/sequentialReduce';

// Assign fetch function based on environemnt
let fetch;
if (isNode === true) { // Running in Node
  fetch = nodeFetch;
} else { // Running in browser
  fetch = window.fetch;
}

export default async function request(path = '', apiOptions = {}) {
  // Filter and throw error if path is of anti-pattern format.
  if (/^http|^\d+\.\d+\.\d+\.\d+|^[A-Za-z]+\.[A-Za-z]+/.test(path)) {
    return Promise.reject(new Error(oneLine`
      Request path should not contain any one of protocol, domain or port,
      please look at path and apiOptions.baseUrl for details.
    `));
  }

  if (!isObject(apiOptions)) {
    return Promise.reject(new Error('Request apiOptions must be an object.'));
  }

  const requestInterceptors = [
    ...this.interceptors.requestInterceptorsBeforeMain,
    this.interceptors.mainRequestInterceptor,
    ...this.interceptors.requestInterceptorsAfterMain,
  ];

  let {
    url,
    options,
  } = await sequentialReduce(requestInterceptors, path, this.defaultOptions, apiOptions);

  options = filterUndefinedHeaders(options);

  const response = await fetch(url, options);

  const responseInterceptors = [
    ...this.interceptors.responseInterceptorsBeforeMain,
    this.interceptors.mainResponseInterceptor,
    ...this.interceptors.responseInterceptorsAfterMain,
  ];

  return sequentialReduce(responseInterceptors, response);
}
