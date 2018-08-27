import stringify from 'qs/lib/stringify';

/**
 * @param  {object|array} [query] - Query object.
 * @param  {function} [queryFormatter=qs.stringify] - A function understands how to stringify query.
 * @return {string} - Either an empty string or query string prefixed with a question mark.
 */
export default function qsStringify(query, queryFormatter = stringify) {
  if (typeof queryFormatter !== 'function') {
    throw Error('queryFormatter is not a function');
  }

  let queryString = queryFormatter(query);

  // Add question mark before query string
  queryString = queryString === '' ? '' : `?${queryString}`;

  return queryString;
}
