/**
 * Type transformation based on body type.
 * @param  {any} body - Request body.
 */
export default function getBody(body) {
  if (body === void 0 || body === null) {
    return void 0;
  }

  if (Object(body) === body) { // Object
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
