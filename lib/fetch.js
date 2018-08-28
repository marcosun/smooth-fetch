import isNode from 'detect-node';
import nodeFetch from 'node-fetch';
import oneLine from 'common-tags/lib/oneLine';
import defaultRequestInterceptor from './requestInterceptor';
import defaultResponseInterceptor from './responseInterceptor';

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
 * each and every single api call.
 * @param  {string} [baseOptions.baseUrl] - This property usually takes the following pattern:
 * protocol://domain:port or a relative path.
 * @return {function}
 */
export default function injectOptions(baseOptions = {}) {
  if (Object(baseOptions) !== baseOptions) {
    throw Error('baseOptions is not an object');
  }

  /**
   * @param  {function} [requestInterceptor] - A function returns request url and fetch options.
   * @param  {function} [responseInterceptor] - A function understands how to handle
   * stream response data.
   * @return {function}
   */
  return function injectInterceptor(
    requestInterceptor = defaultRequestInterceptor,
    responseInterceptor = defaultResponseInterceptor,
  ) {
    if (typeof responseInterceptor !== 'function') {
      throw Error('responseInterceptor is not a function');
    }

    /**
     * This is the actual function to fire an api call.
     * @param  {string} [path=''] - Resource path. It takes the form of /path/to/api.
     * Please be aware that protocol://domain:port/path/to/api is anti-pattern.
     * One should define protocol://domain:port as baseUrl of baseOptions or apiOptions.
     * @param  {object} [apiOptions={}] - Fetch options that will be merged against baseOptions
     * and consumed by this api call. apiOptions has a higher priority than baseOptions, therefore
     * properties defined in apiOptions will overwrite those in baseOptions.
     * @param  {string} [apiOptions.baseUrl=.] - This property usually takes the following pattern:
     * protocol://domain:port or a relative path. baseUrl will be used to create the actual request
     * url together with path in a way like this: `${baseUrl}/${path}`. apiOptions will be merged
     * against baseOptions, therefore, if you do not intend to overwrite baseUrl predefined in
     * baseOptions, don't declare baseUrl at all, because passing {baseUrl: undefined} is a valid
     * instruction to prefix string undefined in front of path.
     * @param  {object|array} [apiOptions.query] - Query object.
     * @param  {function} [apiOptions.queryFormatter=qs.stringify] - A function understands how to
     * stringify query.
     */
    return async function request(path = '', apiOptions = {}) {
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
      } = requestInterceptor(path, baseOptions, apiOptions);

      const response = await fetch(url, options);

      return responseInterceptor(response);
    };
  };
}
