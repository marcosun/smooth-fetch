import isObject from '../util/isObject';

/**
 * Return content-type by inspecting body type.
 */
export default function requestContentType(body) {
  if (body === void 0 || body === null) {
    return void 0;
  }

  if (isObject(body)) {
    if (Object.keys(body).length === 0) return void 0; // Empty object

    return 'application/json';
  }

  if (typeof body === 'string' ||
    typeof body === 'number' ||
    typeof body === 'boolean'
  ) {
    return 'text/plain';
  }

  return void 0;
}
