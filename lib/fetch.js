import qs from 'qs';
import isNode from 'detect-node';

import defaultResolver from './resolver';

// Assign fetch function based on environemnt
let fetch;
if (isNode === true) { // Running in Node
  fetch = require('node-fetch');
} else { // Running in browser
  fetch = window.fetch;
}

/**
 * @param  {object} [baseOptions={}] - Fetch options. Memorise api wise options.
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
