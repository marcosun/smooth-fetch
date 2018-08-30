import InterceptorManager from './InterceptorManager';
import request from './request';

export default class Fetch {
  constructor(defaultOptions = {}) {
    // if (Object(defaultOptions) !== defaultOptions) {
    //   throw Error('defaultOptions is not an object');
    // }

    this.defaultOptions = defaultOptions;
  }

  interceptors = new InterceptorManager();

  request = request.bind(this);
}
