import _ from 'lodash';
import axios from 'axios';
import { Logger } from '@karmaniverous/edge-logger';
const logger = new Logger();

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

  /**
   * Get the {@link https://axios-http.com/docs/instance Axios instance}.
   *
   * @returns {object} {@link https://axios-http.com/docs/instance Axios instance}.
   */
  get api() {
    return this.#api;
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
   * Compose {@link https://axios-http.com/docs/handling_errors Axios error} & emit logs.
   *
   * @static
   * @param {object} e - {@link https://axios-http.com/docs/handling_errors Axios error object}.
   * @returns {WrappedApiError} {@link WrappedApiError} object.
   */
  static composeError(e) {
    const error = {
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

    logger.error(e.message);
    logger.error(error);

    return error;
  }

  /**
   * Compose {@link https://axios-http.com/docs/res_schema Axios response} & emit logs.
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

    const response = {
      status,
      statusText,
      ...(_.size(pickedHeaders) ? { headers: pickedHeaders } : {}),
      data,
    };

    logger.info('SUCCESS');
    logger.debug(response);

    return response;
  }
}
