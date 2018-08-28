import qsStringify from '../qsStringify';

/**
 * Compose a request url with parameters.
 * Will prepend slash before path if neccessary.
 */
export default function requestUrl(baseUrl, path, query, queryFormatter) {
  const queryString = qsStringify(query, queryFormatter);

  const slashBeforePath = baseUrl && path ? `/${path}` : path;

  const url = `${baseUrl}${slashBeforePath}${queryString}`;

  return url;
}
