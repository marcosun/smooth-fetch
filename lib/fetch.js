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
 * @param  {object} [baseOptions={}] - Fetch options that will be inherited and
 * consumed by each and every single api call.
 * @return {function}
 */
export default function(baseOptions = {}) {
  if (Object(baseOptions) !== baseOptions) {
    throw Error('baseOptions is not an object');
  }

  /**
   * @param  {function} resolver - Define how to handle stream response data.
   * @return {function}
   */
  return function(resolver) {

  }
}
