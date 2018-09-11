# smooth-fetch
Fetch API is a very low level JavaScript API. It's behaviour significantly differs from XMLHttpRequest in terms of success and error handling, stream response data type, query string formatting, request body parsing, and more.

The intention of this project is to simplify and enhance fetch api with familiar usage as those XMLHttpRequest libraries, to name a few: [axios](https://www.npmjs.com/package/axios), [request](https://www.npmjs.com/package/request), ajax.

It can be used in ES6 feature supported browsers as well as Node.js thanks to [node-fetch](https://www.npmjs.com/package/node-fetch).

## Installation

smooth-fetch is available as an [npm package](https://www.npmjs.com/package/smooth-fetch).

```sh
yarn add smooth-fetch
// or
npm install --save smooth-fetch
```

## Usage

### Basic

```javascript
// request.js
import { Fetch } from 'smooth-fetch';

const instance = new Fetch({
  baseUrl: 'http://localhost:3000/protected',
  credentials: 'include',
  mode: 'cors', // Enable CORS
});

const request = instance.request;

export default request;
```

```javascript
// api.js
import request from './request';

async function login() {
  try {
    await request('login', { // Request goes to http://localhost:3000/protected/login
      method: 'POST',
      body: { // Automatically create Content-Type: 'application/json' in request headers.
        username: 'kevin',
        password: 'pin',
      },
      mode: 'same-origin', // Overwrites defaultOptions.
    };
    console.log('ok');
  } catch(e) { // Throw error when http status code is not 2XX.
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
  } catch(e) { // Throw error when http status code is not 2XX.
    console.log('fetch book failed');
  }
};
```

### Advanced

```javascript
// request.js
import { Fetch } from 'smooth-fetch';

const instance = new Fetch({ // defaultOptions can be accessed by all request interceptors.
  baseUrl: 'http://some.domain/v1',
  headers: { // Attach some headers on every request.
    'Customised-Header': 'Header Value',
  },
});

const requestInterceptor = (path, defaultOptions, apiOptions, previousInterceptorResult) => {
  const {
    url,
    options,
  } = previousInterceptorResult;

  if (beginWith(path, 'v2')) {
    return { // path starting with v2 goes to http://other.domain/v1
      url: `http://other.domain/v2${excludeInitialPath(path)}`,
      options,
    };
  }

  return {
    url, // path starting with v1 goes to http://some.domain/v1
    options,
  };
};

const responseInterceptor = (response, previousInterceptorResult) => {
  if (response.status === 401) { // Redirect to login page if any api returns status code 401.
    window.location.href = '/login';
  }
};

instance.interceptors.request.append(requestInterceptor);
instance.interceptors.response.prepend(responseInterceptor);

const request = instance.request;

export default request;
```

## Behind The Scene

### Step 1 - Configuration

Create an instance by calling `new Fetch(defaultOptions)`. defaultOptions can be accessed by all request interceptors. One would like to define universal configurations here.

### Step 2 - Run

Each instance has a request method. This request is not exactly the same as ES6 fetch api, instead it is a wrapper function around ES6 fetch api. Calling this function kicks off a sequence of request lifecycles. A request goes through all request interceptors, then ES6 fetch api, and finally all response interceptors. smooth-fetch splits both request and response interceptors into three stages: before main, main (built-in), and after main. Interceptors are executed by order.

### Step 3 - Pre-Request

Each request interceptor has access to path, defaultOptions, apiOptions, and returned value from the previous interceptor.

### Step 3.1 - Before Main

For each call to `instance.interceptors.request.prepend()`, smooth-fetch places the interceptor function at the very first place of the row. 

### Step 3.1 - Main (Built-in)

Built-in request interceptor shallow merges defaultOptions, apiOptions, and returned value from the previous interceptor to automatically generate the following outputs:

1. Url address with query string.
2. Appropriate Content-Type header corresponding to request body.
3. Stringify request body.

It returns an object with two properties: url and options.

To overwrite built-in request interceptor, one may use `instance.interceptors.request.main()`.

### Step 3.3 - After Main

For each call to `instance.interceptors.request.append()`, smooth-fetch places the interceptor function at the very last place of the row. 

### Step 4 - ES6 Fetch API

Read url and options from the final request interceptor, and call ES6 fetch api with these two variables. A response arrives response interceptors as soon as it is returned.

### Step 5 - After-Request

Each response interceptor has access to the original response object, and the returned value from the previous interceptor.

### Step 5.1 - Before Main

For each call to `instance.interceptors.response.prepend()`, smooth-fetch places the interceptor function at the very first place of the row. 

### Step 5.2 - Main (Built-in)

Built-in response interceptor chooses the correct method to parse stream response body according to the Content-Type header. It also resolves or rejects a request by status code.

To overwrite built-in response interceptor, one may use `instance.interceptors.response.main()`.

### Step 5.3 - After Main

For each call to `instance.interceptors.response.append()`, smooth-fetch places the interceptor function at the very last place of the row. 

## Docs

### Constructor

### `Fetch(defaultOptions)`

Initialise request instance.

- `defaultOptions`: (`Optional` `Default => {}`) To be be consumed by each and every single request interceptor. Please refer to [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) for more details.
***Unique properties that are vital for built-in request interceptor:***
- `defaultOptions.baseUrl`: (`String` `Optional` `Default => ''`) This property usually takes the following pattern: protocol://hostname:port or /api.
- `defaultOptions.query`: (`Object|String` `Optional` `Default => void`) A query object that will be consumed by queryFormatter to produce a query string.
- `defaultOptions.queryFormatter`: (`Function` `Optional` `Default => qs.stringify(query)`) A function consumes query and outputs a query string.

### Instance methods

### `request(path, apiOptions)`

A wrapper function over ES6 fetch api. Calling this function triggers request interceptors first, then the actual network request, and finally response interceptors.

- `path`: (`Optional` `Default => ''`) In built-in request interceptor, this will be concatenated with baseUrl to become the resource address. Do not include either protocol, hostname or port number as they should appear in baseUrl.
- `apiOptions`: (`Optional` `Default => {}`) A second chance to define fetch options. In built-in request interceptor, this will be shallowly merged against defaultOptions, where properties in apiOptions overwrite properties of the same name in defaultOptions, to output url, Content-Type header and stringify request body.

### `interceptors.request.prepend((path, defaultOptions, apiOptions, previousInterceptorResult) => {})`

Inject request interceptors before built-in interceptor. This function can be called multiple times. The last function to be injected will be executed firstly. The returned value will be passed to the next interceptor.

### `interceptors.request.main((path, defaultOptions, apiOptions, previousInterceptorResult) => ({url, options}))`

Overwrite built-in request interceptor. If it is the last interceptor before the actual network request, make sure it returns an object with property name url and options. The returned value will be passed to the next interceptor.

### `interceptors.request.append((path, defaultOptions, apiOptions, previousInterceptorResult) => ({url, options}))`

Inject request interceptors after built-in interceptor. If it is the last interceptor before the actual network request, make sure it returns an object with property name url and options. The last function to be injected will be executed lastly. The returned value will be passed to the next interceptor.

### `interceptors.response.prepend((response, previousInterceptorResult) => {})`

Inject response interceptors before built-in interceptor. The last function to be injected will be executed firstly. The returned value will be passed to the next interceptor.

### `interceptors.response.main((response, previousInterceptorResult) => {})`

Overwrite built-in response interceptor. The returned value will be passed to the next interceptor.

### `interceptors.response.append((response, previousInterceptorResult) => {})`

Inject response interceptors after built-in interceptor. The last function to be injected will be executed lastly. The returned value will be passed to the next interceptor.

## TODO

- Support async request and response interceptors.
- Simplify interceptors with express middleware in mind.

**Comments are welcomed from the community.**