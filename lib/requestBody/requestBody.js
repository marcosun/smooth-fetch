import isNode from 'detect-node';
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

  /**
   * Be aware of no FormData class available in Node.
   * Currently, user may inject a custom interceptor to define content-type: multiple/form-data.
   * TODO: Consider using formData property to declare the implement of FormData.
   * https://github.com/request/request#user-content-forms
   */
  if (isNode === false && body instanceof FormData) {
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
