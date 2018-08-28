# smooth-fetch
Fetch API is a very low level JavaScript API. It's behaviour significantly differs from XMLHttpRequest in terms of success and error handling, stream response data type, query string formatting, request body parsing, and more.

The intention of this project is to simplify and enhance fetch api with familiar usage as those XMLHttpRequest libraries, to name a few: axios, request, ajax.

It can be used in es6 feature supported browsers as well as Node.js thanks to [node-fetch](https://www.npmjs.com/package/node-fetch).

## Installation

smooth-fetch is available as an [npm package](https://www.npmjs.com/package/smooth-fetch).

```sh
yarn add smooth-fetch
// or
npm install --save smooth-fetch
```

## Usage

```javascript
// request.js
import { fetch } from 'smooth-fetch';

const request = fetch({
  baseUrl: 'http://localhost:3000/protected',
  credentials: 'include',
  mode: 'cors', // Enable CORS
})();

export default request;
```

```javascript
// api.js
import request from './request.js';

async function login() {
  try {
    await request('login', { // Request goes to http://localhost:3000/protected/login
      method: 'POST',
      body: { // Json format post body
        username: 'kevin',
        password: 'pin',
      },
    };
    console.log('ok');
  } catch(e) { // Throws error when http status code is not 2XX
    console.log('login failed');
  }
};

async function fetchBook() {
  try {
    const book = await request('books', {
      query: { // Request goes to http://localhost:3000/protected/books?id=bookId
        id: 'bookId',
      },
    };
  } catch(e) { // Throws error when http status code is not 2XX
    console.log('fetch book failed');
  }
};
```

## Docs

### `fetch(baseOptions)`

Config fetch api by defining global options. Calling this function returns injectInterceptors function.

- `baseOptions`: (`Optional` `Default => {}`) To be be inherited and consumed by each and every single api call. Please refer to [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) for more details.
- `baseOptions.baseUrl`: (`Optional` `Default => ''`) This property usually takes the following pattern: protocol://hostname:port or /api.
- `baseOptions.query`: (`Optional` `Default => void`) Query object.
- `baseOptions.queryFormatter`: (`Optional` `Default => qs.stringify(query)`) A function understands how to stringify query.

### `injectInterceptors(requestInterceptor, responseInterceptor)`

Further config fetch api by defining interceptors right before and after calling es6 fetch api. Calling this function returns request function.

- `requestInterceptor`: (`Optional` `Default => builtInRequestInterceptor`) It takes parameters that smooth-fetch has been configured, and returns request url and request options who will be passed to es6 fetch api directly. Signature: (path, baseOptions, apiOptions) => {url, options}.
- `responseInterceptor`: (`Optional` `Default => builtInResponseInterceptor`) A function understands how to handle stream response data. Signature: (response) => any. Where response is a stream response.

### `request(path, apiOptions)`

Config fetch api by defining local options applies to this request only. Calling this function triggers requestInterceptor first, then the actual network request, and finally responseInterceptor.

- `path`: (`Optional` `Default => ''`) Will be concatenated with baseUrl to become the resource address. Do not include either protocol, hostname or port number as they should appear in baseUrl.
- `apiOptions`: (`Optional` `Default => {}`) A second chance to define fetch options. They are valid for this request only.

### `builtInRequestInterceptor(path, baseOptions, apiOptions)`

Some highlighted features:
1. Shallow merge baseOptions and apiOptions.
2. Understand how to generate resource address with baseUrl, path and query string.
3. Automatically define Content-Type header by inspecting the type of request body.

### `builtInResponseInterceptor(response)`

Some highlighted features:
1. Resolve and reject a request based on http status code.
2. Parse stream response body with a proper method by inspecting Content-Type header.