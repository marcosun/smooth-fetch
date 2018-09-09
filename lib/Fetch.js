import InterceptorManager from './InterceptorManager';
import request from './request';

export default class Fetch {
  constructor(defaultOptions = {}) {
    if (Object(defaultOptions) !== defaultOptions) {
      throw new Error('Create a smooth-fetch instance with an object only.');
    }

    this.defaultOptions = defaultOptions;
  }

  interceptors = new InterceptorManager();

  request = request.bind(this);
}
