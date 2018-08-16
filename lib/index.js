/**
 * Fetch API is a very low level JavaScript API. It's behaviour
 * significantly differs to XMLHttpRequest in terms of success
 * and error handling, stream response data type, query string formatting,
 * request body parsing, and more.
 * The intention of this project is to simplify and enhance fetch api with
 * some common way of usage as those XMLHttpRequest libraries, to name a few:
 * axios, request, ajax.
 */
export { default as fetch } from './fetch';
export { default as resolver } from './resolver';
