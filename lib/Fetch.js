import InterceptorManager from './InterceptorManager';
import request from './request';
import isObject from './util/isObject';

export default class Fetch {
  constructor(defaultOptions = {}) {
    if (!isObject(defaultOptions)) {
      throw new Error('Create a smooth-fetch instance with an object only.');
    }

    this.defaultOptions = defaultOptions;
  }

  interceptors = new InterceptorManager();

  request = request.bind(this);
}
