/**
 * Return response body when status code is 2XX
 * Throw error otherwise
 * @param  {Promise} response - Response promise
 * @return {Object} - Response body in Json format
 */
export default async function(response) {
  const responseBody = await response.json();

  if (response.ok === true) return responseBody;

  throw responseBody;
}
