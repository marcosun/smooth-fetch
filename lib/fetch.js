import qs from 'qs';
import isNode from 'detect-node';
import nodeFetch from 'node-fetch';
import defaultResolver from './resolver';

// Assign fetch function based on environemnt
let fetch;
if (isNode === true) { // Running in Node
  fetch = nodeFetch;
} else { // Running in browser
  fetch = window.fetch;
}

/**
 * Config the fetch api interface by passing baseOptions.
 * @param  {object} [baseOptions={}] - Fetch options that will be inherited and consumed by
 * each and every single api call. Besides fetch options, it accepts a special baseUrl property
 * which usually takes the form protocol://domain:port or a relative path.
 * @return {function}
 */
export default function injectOptions(baseOptions = {}) {
  if (Object(baseOptions) !== baseOptions) {
    throw Error('baseOptions is not an object');
  }

  /**
   * @param  {function} [resolver] - A function understands how to handle stream response data.
   * @return {function}
   */
  return function injectInterceptor(resolver = defaultResolver) {
    if (typeof resolver !== 'function') {
      throw Error('resolver is not a function');
    }

    /**
     * This is the actual function to fire an api call.
     * @param  {string} [path=''] - Resource path. It takes the form of /path/to/api.
     * Please be aware that protocol://domain:port/path/to/api is anti-pattern.
     * One should define protocol://domain:port as baseUrl of baseOptions or apiOptions.
     * TODO: path anti-pattern verificiation.
     * @param  {Object} [apiOptions={}] - Fetch options that will be merged against baseOptions
     * and consumed by this api call. apiOptions has a higher priority than baseOptions, therefore
     * properties defined in apiOptions will overwrite those in baseOptions.
     */
    return function(path = '', apiOptions = {}) {
      // TODO: path anti-pattern verificiation.

      const {
        baseUrl = '.', // protocol://domain:port default to current directory.
        options, // fetch options
      } = {
        ...baseOptions,
        ...apiOptions,
      };
    };
  };
}
