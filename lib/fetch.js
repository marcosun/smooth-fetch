/**
 * A fetch API wrapper, expose a factory to add features on top of fetch
 * such as parsing query and body
 * Also authentication and intercepters can be processed here
 * @module Fetch
 */
import qs from 'qs';
import isNode from 'detect-node';

import defaultResolver from './resolver';

/**
 * Assign fetch function based on environemnt
 */
let fetch;
if (isNode === true) { // Running in Node
  fetch = require('node-fetch');
} else { // Running in browser
  fetch = window.fetch;
}

/**
 * This is a factory returns a function that can be used to call fetch API
 * @param  {String} baseUrl - i.e. http://localhost:3000/ or simply / if same origin
 * @param  {Object} baseOptions - Fetch options
 * @param  {Function} resolver - Read streaming response
 * @return {Function}
 */
export default function(baseUrl = '', baseOptions, resolver) {
  /**
   * Compatible with omit parameters
   */
  if (baseUrl === Object(baseUrl)) {
    resolver = baseOptions;
    baseOptions = baseUrl;
    baseUrl = '';
  }

  if (typeof baseUrl === 'function') {
    resolver = baseUrl;
    baseOptions = {};
    baseUrl = '';
  }

  if (typeof baseOptions === 'function') {
    resolver = baseOptions;
    baseOptions = {};
  }

  /**
   * Type check
   */
  if (typeof baseUrl !== 'string') {
    throw Error('baseUrl must be a string');
  }

  if (baseOptions === void 0) {
    baseOptions = {};
  }

  if (baseOptions !== Object(baseOptions)) {
    throw Error('baseOptions must be an object');
  }

  if (resolver === void 0) {
    resolver = defaultResolver;
  }

  if (typeof resolver !== 'function') {
    throw Error('resolver must be a function');
  }

  /**
   * @param  {String} resource - API address
   * @param  {Object} config - Fetch options
   * @return {Object} - Json object if applied with default resolver
   */
  return async function(resource, config = {}) {
    if (typeof resource !== 'string') {
      throw Error('resource must be a string');
    }

    const options = {
      ...baseOptions,
      ...config,
    };

    /**
     * Parse query string
     */
    const {query} = config;
    let queryString = qs.stringify(query);
    // Add question mark before stringified query string
    queryString = queryString === '' ? '' : `?${queryString}`;

    /**
     * With above, here comes the complete request url
     * @type {[type]}
     */
    const url = `${baseUrl}/${resource}${queryString}`;

    /**
     * Set default content-type to application/json
     * Apply JSON.stringify to body
     */
    if (options.method && options.method !== 'GET' && options.method !== 'HEAD') {
      options.headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (options.body !== void 0 && typeof options.body !== 'string') {
        options.body = JSON.stringify(options.body);
      }
    }

    const response = await fetch(url, options);

    return await resolver(response);
  };
}
