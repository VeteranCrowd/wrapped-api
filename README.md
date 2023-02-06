# WrappedApi

See
[Confluence](https://veterancrowdnetwork.atlassian.net/wiki/spaces/TECH/pages/5047157/WrappedApi)
for documentation.

# API Documentation

## Classes

<dl>
<dt><a href="#WrappedApi">WrappedApi</a></dt>
<dd><p>Wraps an Axios instance to provide standard services.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#WrappedApiError">WrappedApiError</a> : <code>object</code></dt>
<dd><p>WrappedApi error object.</p>
</dd>
<dt><a href="#WrappedApiResponse">WrappedApiResponse</a> : <code>object</code></dt>
<dd><p>WrappedApi response object.</p>
</dd>
</dl>

<a name="WrappedApi"></a>

## WrappedApi
Wraps an Axios instance to provide standard services.

**Kind**: global class  

* [WrappedApi](#WrappedApi)
    * _instance_
        * [.api](#WrappedApi+api) ⇒ <code>object</code>
        * [.init([config])](#WrappedApi+init) ⇒ [<code>WrappedApi</code>](#WrappedApi)
    * _static_
        * [.composeError(e)](#WrappedApi.composeError) ⇒ [<code>WrappedApiError</code>](#WrappedApiError)
        * [.composeResponse(response)](#WrappedApi.composeResponse) ⇒ [<code>WrappedApiResponse</code>](#WrappedApiResponse)

<a name="WrappedApi+api"></a>

### wrappedApi.api ⇒ <code>object</code>
Get the [Axios instance](https://axios-http.com/docs/instance).

**Kind**: instance property of [<code>WrappedApi</code>](#WrappedApi)  
**Returns**: <code>object</code> - [Axios instance](https://axios-http.com/docs/instance).  
<a name="WrappedApi+init"></a>

### wrappedApi.init([config]) ⇒ [<code>WrappedApi</code>](#WrappedApi)
Initialize [Axios instance](https://axios-http.com/docs/instance).

**Kind**: instance method of [<code>WrappedApi</code>](#WrappedApi)  
**Returns**: [<code>WrappedApi</code>](#WrappedApi) - [WrappedApi](#WrappedApi) instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| [config] | <code>object</code> | [Axios config object](https://axios-http.com/docs/req_config). |

<a name="WrappedApi.composeError"></a>

### WrappedApi.composeError(e) ⇒ [<code>WrappedApiError</code>](#WrappedApiError)
Compose [Axios error](https://axios-http.com/docs/handling_errors) & emit logs.

**Kind**: static method of [<code>WrappedApi</code>](#WrappedApi)  
**Returns**: [<code>WrappedApiError</code>](#WrappedApiError) - [WrappedApiError](#WrappedApiError) object.  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | [Axios error object](https://axios-http.com/docs/handling_errors). |

<a name="WrappedApi.composeResponse"></a>

### WrappedApi.composeResponse(response) ⇒ [<code>WrappedApiResponse</code>](#WrappedApiResponse)
Compose [Axios response](https://axios-http.com/docs/res_schema) & emit logs.

**Kind**: static method of [<code>WrappedApi</code>](#WrappedApi)  
**Returns**: [<code>WrappedApiResponse</code>](#WrappedApiResponse) - [WrappedApiResponse](#WrappedApiResponse) object.  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>object</code> | [Axios response object](https://axios-http.com/docs/res_schema). |
| [response.headers] | <code>object</code> | Response headers. |
| [response.status] | <code>number</code> | Response status code. |
| [response.statusText] | <code>number</code> | Response status text. |
| [response.data] | <code>object</code> | Response body. |

<a name="WrappedApiError"></a>

## WrappedApiError : <code>object</code>
WrappedApi error object.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [error] | <code>string</code> | Axios error message. |
| [response] | <code>object</code> | Received HTTP response. |
| [response.status] | <code>number</code> | Response status code. |
| [response.headers] | <code>object</code> | Selected response headers. |
| [response.data] | <code>object</code> | Response body. |
| [request] | <code>object</code> | HTTP request body. |

<a name="WrappedApiResponse"></a>

## WrappedApiResponse : <code>object</code>
WrappedApi response object.

**Kind**: global typedef  
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
