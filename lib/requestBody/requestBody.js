import isObject from '../util/isObject';

/**
 * Parse request body.
 */
export default function requestBody(body) {
  if (body === void 0 || body === null) {
    return void 0;
  }

  if (typeof body === 'string' ||
    typeof body === 'number' ||
    typeof body === 'boolean'
  ) {
    return body.toString();
  }

  if (body instanceof FormData) {
    return body;
  }

  if (isObject(body)) {
    if (Object.keys(body).length === 0) return void 0; // Empty object

    return JSON.stringify(body);
  }

  /**
   * For unknown body type, remain untouched.
   */
  return body;
}
