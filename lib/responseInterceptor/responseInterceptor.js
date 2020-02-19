const jsonLikeContentTypes = /^application\/json/;
const textLikeContentTypes = /^text\//;
const imageLikeContentTypes = /^image\//;
const videoLikeContentTypes = /^(audio|video)\//;

/**
 * Parse response body based on Content-Type.
 * Throw error if response status code is not 2XX.
 * @param  {Promise} response - Stream response data.
 * @return {any} - Parsed response body.
 */
export default async function responseInterceptor(response) {
  let parsedData;

  // No content.
  if (response.status === 204) {
    response.data = void 0;
    return response;
  }

  const contentType = response.headers.get('Content-Type');

  if (videoLikeContentTypes.test(contentType)) parsedData = await response.arrayBuffer();
  if (imageLikeContentTypes.test(contentType)) parsedData = await response.blob();
  if (jsonLikeContentTypes.test(contentType)) parsedData = await response.json();
  if (textLikeContentTypes.test(contentType)) parsedData = await response.text();
  // TODO: I don't the use case of formData at the moment.

  response.data = parsedData;

  // Reject promise based on status code.
  if (response.ok !== true) return Promise.reject(response);

  return response;
}
