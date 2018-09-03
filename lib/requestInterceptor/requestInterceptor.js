import requestUrl from '../requestUrl';
import requestContentType from '../requestContentType';
import requestBody from '../requestBody';

function composeOptions(options) {
  const {
    headers,
    ...others
  } = options;

  let impliedContentType;
  let impliedBody;
  // Only GET and HEAD request methods bypass content-type auto-detection and body parsing.
  if (others.method && // Omitted
    others.method !== 'GET' && others.method !== 'HEAD' // Neither GET nor HEAD
  ) {
    impliedContentType = requestContentType(others.body);
    impliedBody = requestBody(others.body);
  }

  return {
    headers: {
      'Content-Type': impliedContentType,
      ...headers,
    },
    ...others,
    body: impliedBody,
  };
}

/**
 * 1. Compose url with baseUrl, path and query.
 * 2. Compose fetch options with implied content type and implied request body.
 * Returns request url and fetch options.
 * @param  {string} path
 * @param  {object} defaultOptions
 * @param  {object} apiOptions
 * @param  {object} previousInterceptorResult
 * @return {object}
 */
export default function requestInterceptor(
  path,
  defaultOptions,
  apiOptions,
  previousInterceptorResult,
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

  const address = requestUrl(baseUrl, path, query, queryFormatter);

  const fetchOptions = composeOptions(others);

  return {
    url: address,
    options: fetchOptions,
  };
}
