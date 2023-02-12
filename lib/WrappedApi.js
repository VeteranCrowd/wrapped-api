import _ from 'lodash';
import axios from 'axios';
import { Logger } from '@karmaniverous/edge-logger';

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

/** Wraps an Axios instance to provide standard services. */
export class WrappedApi {
  #api;
  #logger;

  constructor({ logger } = {}) {
    this.#logger = logger ?? new Logger();
  }

  /**
   * Initialize {@link https://axios-http.com/docs/instance Axios instance}.
   *
   * @param {object} [config] {@link https://axios-http.com/docs/req_config Axios config object}.
   * @returns {WrappedApi} {@link WrappedApi} instance for chaining.
   */
  init(config) {
    this.#api = axios.create(config);
    return this;
  }

  /**
   * Compose {@link https://axios-http.com/docs/handling_errors Axios error}.
   *
   * @static
   * @param {object} e - {@link https://axios-http.com/docs/handling_errors Axios error object}.
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
   * @static
   * @param {object} response - {@link https://axios-http.com/docs/res_schema Axios response object}.
   * @param {object} [response.headers] - Response headers.
   * @param {number} [response.status] - Response status code.
   * @param {number} [response.statusText] - Response status text.
   * @param {object} [response.data] - Response body.
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

  async request(...args) {
    return this.#request('request', ...args);
  }

  async get(...args) {
    return this.#request('get', ...args);
  }

  async delete(...args) {
    return this.#request('delete', ...args);
  }

  async head(...args) {
    return this.#request('head', ...args);
  }

  async options(...args) {
    return this.#request('options', ...args);
  }

  async post(...args) {
    return this.#request('post', ...args);
  }

  async put(...args) {
    return this.#request('put', ...args);
  }

  async patch(...args) {
    return this.#request('patch', ...args);
  }
}
