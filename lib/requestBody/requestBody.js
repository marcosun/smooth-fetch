import isObject from '../util/isObject';

/**
 * Parse request body.
 */
export default function requestBody(body) {
  if (body === void 0 || body === null) {
    return void 0;
  }

  if (isObject(body)) {
    if (Object.keys(body).length === 0) return void 0; // Empty object

    return JSON.stringify(body);
  }

  if (typeof body === 'string' ||
    typeof body === 'number' ||
    typeof body === 'boolean'
  ) {
    return body.toString();
  }

  return void 0;
}
