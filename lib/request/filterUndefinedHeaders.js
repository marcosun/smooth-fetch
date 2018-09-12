import pickBy from 'lodash/pickBy';
import isObject from '../util/isObject';

export default function filterUndefinedHeaders({ headers = {}, ...others }) {
  let filteredHeaders;

  if (isObject(headers)) {
    filteredHeaders = pickBy(headers, value => value !== void 0);
  }

  return {
    headers: {
      ...filteredHeaders,
    },
    ...others,
  };
}
