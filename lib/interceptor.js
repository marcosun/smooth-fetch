/**
 * Parse response body based on Content-Type.
 * Throw error if response status code is not 2XX.
 * @param  {Promise} response - Stream response data.
 * @return {any} - Parsed response body.
 */
export default async function interceptor(response) {
  let parsedData;

  const contentType = response.headers.get('Content-Type');

  if (/^application\/json/.test(contentType)) parsedData = response.json();

  if (response.ok !== true) return Promise.reject(parsedData);

  return parsedData;
}
