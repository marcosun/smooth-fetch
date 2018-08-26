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
export default async function interceptor(response) {
  let parsedData;

  const contentType = response.headers.get('Content-Type');

  if (videoLikeContentTypes.test(contentType)) parsedData = response.arrayBuffer();
  if (imageLikeContentTypes.test(contentType)) parsedData = response.blob();
  if (jsonLikeContentTypes.test(contentType)) parsedData = response.json();
  if (textLikeContentTypes.test(contentType)) parsedData = response.text();

  if (response.ok !== true) return Promise.reject(parsedData);

  return parsedData;
}
