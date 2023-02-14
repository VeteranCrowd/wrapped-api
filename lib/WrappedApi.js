/**
 * @module WrappedApi
 */

import _ from 'lodash';
import axios from 'axios';

/**
 * WrappedApi error object.
 *
 * @typedef {object} WrappedApiError
 * @property {string} [error] - Axios error message.
 * @property {object} [response] - Received HTTP response.
 * @property {number} [response.status] - Response status code.
 * @property {object} [response.headers] - Selected response headers.
 * @property {object} [response.data] - Response body.
 * @property {object} [request] - HTTP request body.
 */

/**
 * WrappedApi response object.
 *
 * @typedef {object} WrappedApiResponse
 * @property {object} [response] - Received HTTP response.
 * @property {number} [response.status] - Response status code.
 * @property {string} [response.statusText] - Response status text.
 * @property {object} [response.headers] - Selected response headers.
 * @property {object} [response.data] - Response body.
 */

/**
 * Wraps an Axios instance to provide standard logging & services.
 */
export class WrappedApi {
  #api;
  #logger;

  /**
   * WrappedApi constructor.
   *
   * @param {object} [options] - Options.
   * @param {object} [options.logger] - Logger instance.
   */
  constructor({ logger = console } = {}) {
    this.#logger = logger;
  }

  /**
   * Initialize {@link https://axios-http.com/docs/instance Axios instance}.
   *
   * @param {axios.AxiosRequestConfig} [config] {@link https://axios-http.com/docs/req_config Axios config object}.
   * @returns {WrappedApi} {@link WrappedApi} instance for chaining.
   */
  init(config) {
    this.#api = axios.create(config);
    return this;
  }

  /**
   * Compose {@link https://axios-http.com/docs/handling_errors Axios error}.
   *
   * @param {axios.AxiosError} e - {@link https://axios-http.com/docs/handling_errors Axios error object}.
   * @returns {WrappedApiError} {@link WrappedApiError} object.
   */
  static composeError(e) {
    return {
      error: e.message,
      response: {
        status: e.response?.status,
        headers: _.pick(e.response?.headers, 'x-correlation-id'),
        data: e.response?.data,
      },
      request: {
        ...(e.response?.config?.data
          ? { data: JSON.parse(e.response?.config?.data) }
          : {}),
      },
    };
  }

  /**
   * Compose {@link https://axios-http.com/docs/res_schema Axios response}.
   *
   * @param {axios.AxiosResponse} response - {@link https://axios-http.com/docs/res_schema Axios response object}.
   * @returns {WrappedApiResponse} {@link WrappedApiResponse} object.
   */
  static composeResponse({ headers, status, statusText, data }) {
    const pickedHeaders = _.pick(headers, 'x-correlation-id');

    return {
      status,
      statusText,
      ...(_.size(pickedHeaders) ? { headers: pickedHeaders } : {}),
      data,
    };
  }

  /**
   * Send a generic request using the {@link https://axios-http.com/docs/instance Axios instance}.
   *
   * @private
   * @param {string} alias - Request alias.
   * @param  {...any} args - Request arguments.
   * @returns {WrappedApiResponse} {@link WrappedApiResponse} object.
   */
  async #request(alias, ...args) {
    try {
      this.#logger.info(
        `Sending ${
          alias === 'request' ? '' : `${alias.toUpperCase()} `
        }request...`
      );
      this.#logger.debug(...args);

      const response = WrappedApi.composeResponse(
        await this.#api[alias](...args)
      );

      this.#logger.info('SUCCEEDED');
      this.#logger.debug(response);

      return response;
    } catch (e) {
      const error = WrappedApi.composeError(e);

      this.#logger.error('FAILED');
      this.#logger.error(error);

      throw new Error(error);
    }
  }

  /**
   * Send a generic request using the {@link https://axios-http.com/docs/instance Axios instance}.
   *
   * @param  {axios.AxiosRequestConfig} [config] - {@link https://axios-http.com/docs/req_config Axios config object}.
   * @returns {WrappedApiResponse} {@link WrappedApiResponse} object.
   */
  async request(config) {
    return this.#request('request', config);
  }

  /**
   * Send a GET request using the {@link https://axios-http.com/docs/instance Axios instance}.
   *
   * @param  {string} [url] - Request URL.
   * @param  {axios.AxiosRequestConfig} [config] - {@link https://axios-http.com/docs/req_config Axios config object}.
   * @returns {WrappedApiResponse} {@link WrappedApiResponse} object.
   */
  async get(url, config) {
    return this.#request('get', url, config);
  }

  /**
   * Send a DELETE request using the {@link https://axios-http.com/docs/instance Axios instance}.
   *
   * @param  {string} [url] - Request URL.
   * @param  {axios.AxiosRequestConfig} [config] - {@link https://axios-http.com/docs/req_config Axios config object}.
   * @returns {WrappedApiResponse} {@link WrappedApiResponse} object.
   */
  async delete(url, config) {
    return this.#request('delete', url, config);
  }

  /**
   * Send a HEAD request using the {@link https://axios-http.com/docs/instance Axios instance}.
   *
   * @param  {string} [url] - Request URL.
   * @param  {axios.AxiosRequestConfig} [config] - {@link https://axios-http.com/docs/req_config Axios config object}.
   * @returns {WrappedApiResponse} {@link WrappedApiResponse} object.
   */
  async head(url, config) {
    return this.#request('head', url, config);
  }

  /**
   * Send a OPTIONS request using the {@link https://axios-http.com/docs/instance Axios instance}.
   *
   * @param  {string} [url] - Request URL.
   * @param  {axios.AxiosRequestConfig} [config] - {@link https://axios-http.com/docs/req_config Axios config object}.
   * @returns {WrappedApiResponse} {@link WrappedApiResponse} object.
   */
  async options(url, config) {
    return this.#request('options', url, config);
  }

  /**
   * Send a POST request using the {@link https://axios-http.com/docs/instance Axios instance}.
   *
   * @param  {string} [url] - Request URL.
   * @param  {object} [data] - Request body.
   * @param  {axios.AxiosRequestConfig} [config] - {@link https://axios-http.com/docs/req_config Axios config object}.
   * @returns {WrappedApiResponse} {@link WrappedApiResponse} object.
   */
  async post(url, data, config) {
    return this.#request('post', url, data, config);
  }

  /**
   * Send a PUT request using the {@link https://axios-http.com/docs/instance Axios instance}.
   *
   * @param  {string} [url] - Request URL.
   * @param  {object} [data] - Request body.
   * @param  {axios.AxiosRequestConfig} [config] - {@link https://axios-http.com/docs/req_config Axios config object}.
   * @returns {WrappedApiResponse} {@link WrappedApiResponse} object.
   */
  async put(url, data, config) {
    return this.#request('put', url, data, config);
  }

  /**
   * Send a PATCH request using the {@link https://axios-http.com/docs/instance Axios instance}.
   *
   * @param  {string} [url] - Request URL.
   * @param  {object} [data] - Request body.
   * @param  {axios.AxiosRequestConfig} [config] - {@link https://axios-http.com/docs/req_config Axios config object}.
   * @returns {WrappedApiResponse} {@link WrappedApiResponse} object.
   */
  async patch(url, data, config) {
    return this.#request('patch', url, data, config);
  }
}
