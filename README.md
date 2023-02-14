# WrappedApi

This package wraps an [Axios](https://axios-http.com/docs/intro) instance to provide consistent logging and other services. See [Confluence](https://veterancrowdnetwork.atlassian.net/wiki/spaces/TECH/pages/5079369/Library) for more info.

# API Documentation

<a name="module_WrappedApi"></a>

## WrappedApi

* [WrappedApi](#module_WrappedApi)
    * _static_
        * [.WrappedApi](#module_WrappedApi.WrappedApi)
            * [new exports.WrappedApi([options])](#new_module_WrappedApi.WrappedApi_new)
            * _instance_
                * [.logger](#module_WrappedApi.WrappedApi+logger) ⇒ <code>object</code>
                * [.init([config])](#module_WrappedApi.WrappedApi+init) ⇒ <code>WrappedApi</code>
                * [.request([config])](#module_WrappedApi.WrappedApi+request) ⇒ <code>WrappedApiResponse</code>
                * [.get([url], [config])](#module_WrappedApi.WrappedApi+get) ⇒ <code>WrappedApiResponse</code>
                * [.delete([url], [config])](#module_WrappedApi.WrappedApi+delete) ⇒ <code>WrappedApiResponse</code>
                * [.head([url], [config])](#module_WrappedApi.WrappedApi+head) ⇒ <code>WrappedApiResponse</code>
                * [.options([url], [config])](#module_WrappedApi.WrappedApi+options) ⇒ <code>WrappedApiResponse</code>
                * [.post([url], [data], [config])](#module_WrappedApi.WrappedApi+post) ⇒ <code>WrappedApiResponse</code>
                * [.put([url], [data], [config])](#module_WrappedApi.WrappedApi+put) ⇒ <code>WrappedApiResponse</code>
                * [.patch([url], [data], [config])](#module_WrappedApi.WrappedApi+patch) ⇒ <code>WrappedApiResponse</code>
            * _static_
                * [.composeError(e)](#module_WrappedApi.WrappedApi.composeError) ⇒ <code>WrappedApiError</code>
                * [.composeResponse(response)](#module_WrappedApi.WrappedApi.composeResponse) ⇒ <code>WrappedApiResponse</code>
    * _inner_
        * [~WrappedApiError](#module_WrappedApi..WrappedApiError) : <code>object</code>
        * [~WrappedApiResponse](#module_WrappedApi..WrappedApiResponse) : <code>object</code>

<a name="module_WrappedApi.WrappedApi"></a>

### WrappedApi.WrappedApi
Wraps an Axios instance to provide standard logging & services.

**Kind**: static class of [<code>WrappedApi</code>](#module_WrappedApi)  

* [.WrappedApi](#module_WrappedApi.WrappedApi)
    * [new exports.WrappedApi([options])](#new_module_WrappedApi.WrappedApi_new)
    * _instance_
        * [.logger](#module_WrappedApi.WrappedApi+logger) ⇒ <code>object</code>
        * [.init([config])](#module_WrappedApi.WrappedApi+init) ⇒ <code>WrappedApi</code>
        * [.request([config])](#module_WrappedApi.WrappedApi+request) ⇒ <code>WrappedApiResponse</code>
        * [.get([url], [config])](#module_WrappedApi.WrappedApi+get) ⇒ <code>WrappedApiResponse</code>
        * [.delete([url], [config])](#module_WrappedApi.WrappedApi+delete) ⇒ <code>WrappedApiResponse</code>
        * [.head([url], [config])](#module_WrappedApi.WrappedApi+head) ⇒ <code>WrappedApiResponse</code>
        * [.options([url], [config])](#module_WrappedApi.WrappedApi+options) ⇒ <code>WrappedApiResponse</code>
        * [.post([url], [data], [config])](#module_WrappedApi.WrappedApi+post) ⇒ <code>WrappedApiResponse</code>
        * [.put([url], [data], [config])](#module_WrappedApi.WrappedApi+put) ⇒ <code>WrappedApiResponse</code>
        * [.patch([url], [data], [config])](#module_WrappedApi.WrappedApi+patch) ⇒ <code>WrappedApiResponse</code>
    * _static_
        * [.composeError(e)](#module_WrappedApi.WrappedApi.composeError) ⇒ <code>WrappedApiError</code>
        * [.composeResponse(response)](#module_WrappedApi.WrappedApi.composeResponse) ⇒ <code>WrappedApiResponse</code>

<a name="new_module_WrappedApi.WrappedApi_new"></a>

#### new exports.WrappedApi([options])
WrappedApi constructor.


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | Options. |
| [options.logger] | <code>object</code> | Logger instance. |

<a name="module_WrappedApi.WrappedApi+logger"></a>

#### wrappedApi.logger ⇒ <code>object</code>
Get logger instance.

**Kind**: instance property of [<code>WrappedApi</code>](#module_WrappedApi.WrappedApi)  
**Returns**: <code>object</code> - Logger instance.  
<a name="module_WrappedApi.WrappedApi+init"></a>

#### wrappedApi.init([config]) ⇒ <code>WrappedApi</code>
Initialize [Axios instance](https://axios-http.com/docs/instance).

**Kind**: instance method of [<code>WrappedApi</code>](#module_WrappedApi.WrappedApi)  
**Returns**: <code>WrappedApi</code> - [WrappedApi](WrappedApi) instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| [config] | <code>axios.AxiosRequestConfig</code> | [Axios config object](https://axios-http.com/docs/req_config). |

<a name="module_WrappedApi.WrappedApi+request"></a>

#### wrappedApi.request([config]) ⇒ <code>WrappedApiResponse</code>
Send a generic request using the [Axios instance](https://axios-http.com/docs/instance).

**Kind**: instance method of [<code>WrappedApi</code>](#module_WrappedApi.WrappedApi)  
**Returns**: <code>WrappedApiResponse</code> - [WrappedApiResponse](WrappedApiResponse) object.  

| Param | Type | Description |
| --- | --- | --- |
| [config] | <code>axios.AxiosRequestConfig</code> | [Axios config object](https://axios-http.com/docs/req_config). |

<a name="module_WrappedApi.WrappedApi+get"></a>

#### wrappedApi.get([url], [config]) ⇒ <code>WrappedApiResponse</code>
Send a GET request using the [Axios instance](https://axios-http.com/docs/instance).

**Kind**: instance method of [<code>WrappedApi</code>](#module_WrappedApi.WrappedApi)  
**Returns**: <code>WrappedApiResponse</code> - [WrappedApiResponse](WrappedApiResponse) object.  

| Param | Type | Description |
| --- | --- | --- |
| [url] | <code>string</code> | Request URL. |
| [config] | <code>axios.AxiosRequestConfig</code> | [Axios config object](https://axios-http.com/docs/req_config). |

<a name="module_WrappedApi.WrappedApi+delete"></a>

#### wrappedApi.delete([url], [config]) ⇒ <code>WrappedApiResponse</code>
Send a DELETE request using the [Axios instance](https://axios-http.com/docs/instance).

**Kind**: instance method of [<code>WrappedApi</code>](#module_WrappedApi.WrappedApi)  
**Returns**: <code>WrappedApiResponse</code> - [WrappedApiResponse](WrappedApiResponse) object.  

| Param | Type | Description |
| --- | --- | --- |
| [url] | <code>string</code> | Request URL. |
| [config] | <code>axios.AxiosRequestConfig</code> | [Axios config object](https://axios-http.com/docs/req_config). |

<a name="module_WrappedApi.WrappedApi+head"></a>

#### wrappedApi.head([url], [config]) ⇒ <code>WrappedApiResponse</code>
Send a HEAD request using the [Axios instance](https://axios-http.com/docs/instance).

**Kind**: instance method of [<code>WrappedApi</code>](#module_WrappedApi.WrappedApi)  
**Returns**: <code>WrappedApiResponse</code> - [WrappedApiResponse](WrappedApiResponse) object.  

| Param | Type | Description |
| --- | --- | --- |
| [url] | <code>string</code> | Request URL. |
| [config] | <code>axios.AxiosRequestConfig</code> | [Axios config object](https://axios-http.com/docs/req_config). |

<a name="module_WrappedApi.WrappedApi+options"></a>

#### wrappedApi.options([url], [config]) ⇒ <code>WrappedApiResponse</code>
Send a OPTIONS request using the [Axios instance](https://axios-http.com/docs/instance).

**Kind**: instance method of [<code>WrappedApi</code>](#module_WrappedApi.WrappedApi)  
**Returns**: <code>WrappedApiResponse</code> - [WrappedApiResponse](WrappedApiResponse) object.  

| Param | Type | Description |
| --- | --- | --- |
| [url] | <code>string</code> | Request URL. |
| [config] | <code>axios.AxiosRequestConfig</code> | [Axios config object](https://axios-http.com/docs/req_config). |

<a name="module_WrappedApi.WrappedApi+post"></a>

#### wrappedApi.post([url], [data], [config]) ⇒ <code>WrappedApiResponse</code>
Send a POST request using the [Axios instance](https://axios-http.com/docs/instance).

**Kind**: instance method of [<code>WrappedApi</code>](#module_WrappedApi.WrappedApi)  
**Returns**: <code>WrappedApiResponse</code> - [WrappedApiResponse](WrappedApiResponse) object.  

| Param | Type | Description |
| --- | --- | --- |
| [url] | <code>string</code> | Request URL. |
| [data] | <code>object</code> | Request body. |
| [config] | <code>axios.AxiosRequestConfig</code> | [Axios config object](https://axios-http.com/docs/req_config). |

<a name="module_WrappedApi.WrappedApi+put"></a>

#### wrappedApi.put([url], [data], [config]) ⇒ <code>WrappedApiResponse</code>
Send a PUT request using the [Axios instance](https://axios-http.com/docs/instance).

**Kind**: instance method of [<code>WrappedApi</code>](#module_WrappedApi.WrappedApi)  
**Returns**: <code>WrappedApiResponse</code> - [WrappedApiResponse](WrappedApiResponse) object.  

| Param | Type | Description |
| --- | --- | --- |
| [url] | <code>string</code> | Request URL. |
| [data] | <code>object</code> | Request body. |
| [config] | <code>axios.AxiosRequestConfig</code> | [Axios config object](https://axios-http.com/docs/req_config). |

<a name="module_WrappedApi.WrappedApi+patch"></a>

#### wrappedApi.patch([url], [data], [config]) ⇒ <code>WrappedApiResponse</code>
Send a PATCH request using the [Axios instance](https://axios-http.com/docs/instance).

**Kind**: instance method of [<code>WrappedApi</code>](#module_WrappedApi.WrappedApi)  
**Returns**: <code>WrappedApiResponse</code> - [WrappedApiResponse](WrappedApiResponse) object.  

| Param | Type | Description |
| --- | --- | --- |
| [url] | <code>string</code> | Request URL. |
| [data] | <code>object</code> | Request body. |
| [config] | <code>axios.AxiosRequestConfig</code> | [Axios config object](https://axios-http.com/docs/req_config). |

<a name="module_WrappedApi.WrappedApi.composeError"></a>

#### WrappedApi.composeError(e) ⇒ <code>WrappedApiError</code>
Compose [Axios error](https://axios-http.com/docs/handling_errors).

**Kind**: static method of [<code>WrappedApi</code>](#module_WrappedApi.WrappedApi)  
**Returns**: <code>WrappedApiError</code> - [WrappedApiError](WrappedApiError) object.  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>axios.AxiosError</code> | [Axios error object](https://axios-http.com/docs/handling_errors). |

<a name="module_WrappedApi.WrappedApi.composeResponse"></a>

#### WrappedApi.composeResponse(response) ⇒ <code>WrappedApiResponse</code>
Compose [Axios response](https://axios-http.com/docs/res_schema).

**Kind**: static method of [<code>WrappedApi</code>](#module_WrappedApi.WrappedApi)  
**Returns**: <code>WrappedApiResponse</code> - [WrappedApiResponse](WrappedApiResponse) object.  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>axios.AxiosResponse</code> | [Axios response object](https://axios-http.com/docs/res_schema). |

<a name="module_WrappedApi..WrappedApiError"></a>

### WrappedApi~WrappedApiError : <code>object</code>
WrappedApi error object.

**Kind**: inner typedef of [<code>WrappedApi</code>](#module_WrappedApi)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [error] | <code>string</code> | Axios error message. |
| [response] | <code>object</code> | Received HTTP response. |
| [response.status] | <code>number</code> | Response status code. |
| [response.headers] | <code>object</code> | Selected response headers. |
| [response.data] | <code>object</code> | Response body. |
| [request] | <code>object</code> | HTTP request body. |

<a name="module_WrappedApi..WrappedApiResponse"></a>

### WrappedApi~WrappedApiResponse : <code>object</code>
WrappedApi response object.

**Kind**: inner typedef of [<code>WrappedApi</code>](#module_WrappedApi)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [response] | <code>object</code> | Received HTTP response. |
| [response.status] | <code>number</code> | Response status code. |
| [response.statusText] | <code>string</code> | Response status text. |
| [response.headers] | <code>object</code> | Selected response headers. |
| [response.data] | <code>object</code> | Response body. |


---

See more great templates and other tools on
[my GitHub Profile](https://github.com/karmaniverous)!
