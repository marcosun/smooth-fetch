import requestUrl from '../requestUrl';
import requestContentType from '../requestContentType';
import requestBody from '../requestBody';

function composeOptions(options) {
  const {
    body,
    headers,
    ...others
  } = options;

  let impliedContentType = void 0;
  let impliedBody = void 0;
  // Only GET and HEAD request methods bypass content-type auto-detection and body parsing.
  if (others.method && // Omitted
    others.method !== 'GET' && others.method !== 'HEAD' // Neither GET nor HEAD
  ) {
    impliedContentType = requestContentType(body);
    impliedBody = requestBody(body);
  }

  return {
    headers: {
      'Content-Type': impliedContentType,
      ...headers,
    },
    body: impliedBody,
    ...others,
  };
}

/**
 * 1. Compose url with baseUrl, path and query.
 * 2. Compose fetch options with implied content type and implied request body.
 * Returns request url and fetch options.
 * @param  {string} path
 * @param  {object} defaultOptions
 * @param  {object} apiOptions
 * @param  {object} [previousInterceptorResult={}]
 * @return {object}
 */
export default function requestInterceptor(
  path,
  defaultOptions,
  apiOptions,
  previousInterceptorResult = {},
) {
  const {
    baseUrl = '', // protocol://domain:port default to empty string.
    options, // options property is not allowed before this interceptor.
    query,
    queryFormatter,
    url, // url property is not allowed before this interceptor.
    ...others // Fetch options candidate
  } = {
    ...defaultOptions,
    ...apiOptions,
    ...previousInterceptorResult,
  };

  /**
   * For headers only, apiOptions have the highest priority.
   */
  const { headers: defaultOptionsHeaders } = defaultOptions;
  const { headers: previousInterceptorHeaders } = previousInterceptorResult;
  const { headers: apiOptionsHeaders } = apiOptions;
  const headers = {
    ...defaultOptionsHeaders,
    ...previousInterceptorHeaders,
    ...apiOptionsHeaders,
  };

  const address = requestUrl(baseUrl, path, query, queryFormatter);

  const fetchOptions = composeOptions({ ...others, headers });

  return {
    url: address,
    options: fetchOptions,
  };
}
