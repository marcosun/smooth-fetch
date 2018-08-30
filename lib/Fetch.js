import request from './request';
import builtInRequestInterceptor from './requestInterceptor';
import builtInResponseInterceptor from './responseInterceptor';

export default class Fetch {
  constructor(defaultOptions = {}) {
    // if (Object(defaultOptions) !== defaultOptions) {
    //   throw Error('defaultOptions is not an object');
    // }

    this.defaultOptions = defaultOptions;
  }

  requestInterceptor = builtInRequestInterceptor;

  responseInterceptor = builtInResponseInterceptor;

  request = request;
}
