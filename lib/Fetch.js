import InterceptorManager from './InterceptorManager';
import request from './request';

export default class Fetch {
  constructor(defaultOptions = {}) {
    // TODO: Is this functioning?
    if (Object(defaultOptions) !== defaultOptions) {
      throw new Error('defaultOptions is not an object');
    }

    this.defaultOptions = defaultOptions;
  }

  interceptors = new InterceptorManager();

  request = request.bind(this);
}
