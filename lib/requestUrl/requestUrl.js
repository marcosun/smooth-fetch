import qsStringify from '../qsStringify';

/**
 * Compose a request url with passed in parameters.
 */
export default function requestUrl(baseUrl, path, query, queryFormatter) {
  const queryString = qsStringify(query, queryFormatter);

  const url = `${baseUrl}/${path}${queryString}`;

  return url;
}
