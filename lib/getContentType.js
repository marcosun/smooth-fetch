/**
 * Return content-type by inspecting body type.
 * @param  {any} body - Request body.
 */
export default function getContentType(body) {
  if (body === void 0 || body === null) {
    return void 0;
  }

  if (Object(body) === body) { // Object
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
