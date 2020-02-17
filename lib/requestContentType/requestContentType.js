import isNode from 'detect-node';
import isObject from '../util/isObject';

/**
 * Return content-type by inspecting body type.
 */
export default function requestContentType(body) {
  if (body === void 0 || body === null) {
    return void 0;
  }

  if (typeof body === 'string' ||
    typeof body === 'number' ||
    typeof body === 'boolean'
  ) {
    return 'text/plain';
  }

  /**
   * Be aware of no FormData class available in Node.
   * Currently, user may inject a custom interceptor to define content-type: multiple/form-data.
   * TODO: Consider using formData property to declare the implement of FormData.
   * https://github.com/request/request#user-content-forms
   */
  if (isNode === false && body instanceof FormData) {
    return 'multipart/form-data';
  }

  if (isObject(body)) {
    if (Object.keys(body).length === 0) return void 0; // Empty object

    return 'application/json';
  }

  /**
   * For unknown body type, return unknown content type.
   */
  return void 0;
}
