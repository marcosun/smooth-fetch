import builtInRequestInterceptor from '../requestInterceptor';
import builtInResponseInterceptor from '../responseInterceptor';

export default class InterceptorManager {
  requestInterceptorsBeforeMain = [];

  mainRequestInterceptor = builtInRequestInterceptor;

  requestInterceptorsAfterMain = [];

  responseInterceptorsBeforeMain = [];

  mainResponseInterceptor = builtInResponseInterceptor;

  responseInterceptorsAfterMain = [];

  request = {
    prepend: (interceptor) => {
      this.requestInterceptorsBeforeMain.unshift(interceptor);
    },
    main: (interceptor) => {
      this.mainRequestInterceptor = interceptor;
    },
    append: (interceptor) => {
      this.requestInterceptorsAfterMain.push(interceptor);
    },
  };

  response = {
    prepend: (interceptor) => {
      this.responseInterceptorsBeforeMain.unshift(interceptor);
    },
    main: (interceptor) => {
      this.mainResponseInterceptor = interceptor;
    },
    append: (interceptor) => {
      this.responseInterceptorsAfterMain.push(interceptor);
    },
  };
}
