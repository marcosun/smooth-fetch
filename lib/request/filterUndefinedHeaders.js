import pickBy from 'lodash/pickBy';

export default function({ headers, ...others }) {
  let filteredHeaders;

  if (Object(headers) === headers) {
    filteredHeaders = pickBy(headers, value => value !== void 0);
  }

  return {
    headers: {
      ...filteredHeaders,
    },
    ...others,
  };
}
