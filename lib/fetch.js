import isNode from 'detect-node';
import nodeFetch from 'node-fetch';
import oneLine from 'common-tags/lib/oneLine';
import defaultInterceptor from './interceptor';
import qsStringify from './qsStringify';
import requestContentType from './requestContentType';
import requestBody from './requestBody';

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
   * @param  {function} [interceptor] - A function understands how to handle stream response data.
   * @return {function}
   */
  return function injectInterceptor(interceptor = defaultInterceptor) {
    if (typeof interceptor !== 'function') {
      throw Error('interceptor is not a function');
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
    return async function(path = '', apiOptions = {}) {
      // Filter and throw error if path declared in an anti-pattern format.
      if (/(^http)|(\.)|(:\d+)/.test(path)) {
        return Promise.reject(oneLine`
          Path does not accept protocol://domain:port,
          please look at baseOptions.baseUrl for details
        `);
      }

      const {
        baseUrl = '.', // protocol://domain:port default to current directory.
        query,
        queryFormatter,
        ...options // fetch options
      } = {
        ...baseOptions,
        ...apiOptions,
      };

      const queryString = qsStringify(query, queryFormatter);

      const url = `${baseUrl}/${path}${queryString}`;

      let derivedContentType;
      let derivedBody;
      // Only GET and HEAD request methods bypass content-type autodetection.
      if (!options.method || // Omitted
        (options.method !== 'GET' && options.method !== 'HEAD') // Neither GET nor HEAD
      ) {
        derivedContentType = requestContentType(options.body);
        derivedBody = requestBody(options.body);
      }

      const response = await fetch(url, {
        headers: {
          'Content-Type': derivedContentType,
          ...options.headers,
        },
        ...options,
        body: derivedBody,
      });

      return interceptor(response);
    };
  };
}
