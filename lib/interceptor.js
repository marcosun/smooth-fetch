/**
 * Parse response body based on Content-Type.
 * Throw error if response status code is not 2XX.
 * @param  {Promise} response - Stream response data.
 * @return {any} - Parsed response body.
 */
export default async function interceptor(response) {
  if (response.ok !== true) return Promise.reject(response);
}
