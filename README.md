# smooth-fetch
Fetch API is a very low level JavaScript API. It's behaviour significantly differs to XMLHttpRequest in terms of success and error handling, stream response data type, query string formatting, request body parsing, and more.

The intention of this project is to simplify and enhance fetch api with familiar usage as those XMLHttpRequest libraries, to name a few: axios, request, ajax.

It can be used in es6 feature supported browser as well as NodeJs thanks to [node-fetch](https://www.npmjs.com/package/node-fetch).

## Installation

smooth-fetch is available as an [npm package](https://www.npmjs.com/package/smooth-fetch).

```sh
yarn add smooth-fetch
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

### `fetch(baseUrl, options, resolver)`

fetch is a factory to return a configured fetch API.

- `baseUrl`: (`Optional` `Default => ''`) One can also call fetch(options) to omit baseUrl. It is used to set base url. Think of `<base />` tag in html.
- `options`: (`Optional` `Default => {}`) It is the place to set options that apply to all requests. Please refer to [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) for more details.
- `options.queryFormatter`: (`Optional` `Default => qs.stringify(query: object) => queryString: string`). Function to format query object to string.
- `resolver`: (`Optional` `Default => resolver`) This is the place to write how you would like to read from streaming response. It is also the perfect place to act as an interceptor for each and every request.

### `configuredFetch(resource, options)`

configuredFetch is a function to be called to execute a request. Returns a `Promise`, exactly the same as calling bare fetch.

- `resource`: (`Required`) Resource address.
- `options`: (`Optional` `Default => {}`) Fetch API options. This overwrites options that have been set in `fetch` function.

### `resolver(response)`

resolver reads response as a `json` object and `returns` it if `HTTP Status Code` is `2XX`, `throws` it as an error if `HTTP Status Code` is `not 2XX`.

Added features on top of fetch API are explained in the following:

- `query`: (`Optional`) Accepts `key value pairs` or a `string`. It uses `qs` library to format from an object.
- `body`: (`Optional`) Accepts `key value pairs` or a `sting`. It uses  `JSON.stringify` to format from an object. For other types of format, please pass string.
- `head.Content-Type`: (`Optional` `Default => application/json`) Accepts `string`. It sends request with `Content-Type=application/json` as default for request method other than `GET` or `HEAD`