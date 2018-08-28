import qsStringify from '../qsStringify';

function isEndingWithSlash(path) {
  return /\/$/.test(path);
}

function isStartingWithSlash(path) {
  return /^\//.test(path);
}

/**
 * Compose a request url with parameters.
 */
export default function requestUrl(baseUrl, path, query, queryFormatter) {
  const queryString = qsStringify(query, queryFormatter);

  const isBaseUrlEndingWithSlash = isEndingWithSlash(baseUrl);
  const isPathStartingWithSlash = isStartingWithSlash(path);

  if (baseUrl === '' || path === '') {
    return `${baseUrl}${path}${queryString}`;
  }

  // When either baseUrl or path contains a slash, it's a perfect match.
  if (isBaseUrlEndingWithSlash !== isPathStartingWithSlash) {
    return `${baseUrl}${path}${queryString}`;
  }

  // Delete a slash when both baseUrl and path contain a slash.
  if (isBaseUrlEndingWithSlash && isPathStartingWithSlash) {
    return `${baseUrl.slice(0, -1)}${path}${queryString}`;
  }

  // Add a slash when baseUrl and path are all relative paths.
  return `${baseUrl}/${path}${queryString}`;
}
