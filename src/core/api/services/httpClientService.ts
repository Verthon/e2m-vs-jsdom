type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type Endpoint = `/${string}`

type RequestConfig<TBody = unknown> = {
  method: HttpMethod
  url: string
  body?: TBody
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean | undefined>
  signal?: AbortSignal
  timeout?: number
}

type ApiError = {
  status: number
  statusText: string
  message: string
  url: string
}

type Middleware = (next: FetchFn) => FetchFn
type FetchFn = (config: RequestConfig) => Promise<Response>

type ClientOptions = {
  baseUrl: string
  headers?: Record<string, string>
  timeout?: number
  middleware?: Middleware[]
}

const serializeParams = (
  params: Record<string, string | number | boolean | undefined>
): string => {
  const entries = Object.entries(params).filter(
    (pair): pair is [string, string | number | boolean] =>
      pair[1] !== undefined
  )
  return entries.length
    ? '?' + new URLSearchParams(
        entries.map(([k, v]) => [k, String(v)])
      ).toString()
    : ''
}

const buildUrl = (base: string, path: string, params?: RequestConfig['params']): string =>
  `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}${params ? serializeParams(params) : ''}`

const applyMiddleware = (middleware: Middleware[], fetchFn: FetchFn): FetchFn =>
  middleware.reduceRight((next, mw) => mw(next), fetchFn)

const baseFetch: FetchFn = (config) => {
  const { timeout, signal, ...rest } = config
  const controller = new AbortController()
  const timeoutId = timeout
    ? setTimeout(() => controller.abort(), timeout)
    : undefined

  if (signal) signal.addEventListener('abort', () => controller.abort())

  return fetch(rest.url, {
    method: rest.method,
    headers: rest.headers,
    body: rest.body ? JSON.stringify(rest.body) : undefined,
    signal: controller.signal,
  }).finally(() => clearTimeout(timeoutId))
}

const parseResponse = async <TData>(
  response: Response,
  url: string
): Promise<TData> => {
  if (response.ok) {
    return response.status === 204 ? (undefined as TData) : await response.json()
  }

  let error: ApiError
  try {
    const body = await response.json()
    error = { ...body, status: response.status, url }
  } catch {
    error = {
      status: response.status,
      statusText: response.statusText,
      message: response.statusText,
      url,
    }
  }

  throw error
}

/**
 * Creates a type-safe HTTP client built on top of `fetch`.
 *
 * Features:
 * - Type-safe responses — returns `TData` directly, throws `ApiError` on failure
 * - Composable middleware pipeline (Koa-style onion model)
 * - Auto-serialization of JSON body and query params
 * - Per-request and global timeout via `AbortController`
 * - Configurable default headers
 * - Compatible with React Query out of the box
 *
 * @example
 * ```ts
 * const api = createHttpClient({
 *   baseUrl: 'https://api.example.com',
 *   headers: { 'X-App': 'my-app' },
 *   timeout: 10_000,
 * })
 *
 * type User = { id: string; name: string }
 *
 * // Returns User directly, throws ApiError on failure
 * const user = await api.get<User>('/users/1')
 *
 * // Works natively with React Query
 * const { data } = useQuery({
 *   queryKey: ['user', id],
 *   queryFn: () => api.get<User>(`/users/${id}`),
 * })
 * ```
 */
const createHttpClient = (options: ClientOptions) => {
  const { baseUrl, headers: defaultHeaders = {}, timeout, middleware = [] } = options
  const executeFetch = applyMiddleware(middleware, baseFetch)

  const request = async <TData>(
    config: RequestConfig
  ): Promise<TData> => {
    const url = buildUrl(baseUrl, config.url, config.params)
    const merged: RequestConfig = {
      ...config,
      url,
      timeout: config.timeout ?? timeout,
      headers: { 'Content-Type': 'application/json', ...defaultHeaders, ...config.headers },
    }
    const response = await executeFetch(merged)
    return parseResponse<TData>(response, url)
  }

  return {
    /** Full control over the request configuration. */
    request,

    /** Perform a GET request. */
    get: <TData>(
      url: Endpoint,
      opts?: Omit<RequestConfig, 'method' | 'url' | 'body'>
    ) => request<TData>({ ...opts, method: 'GET', url }),

    /** Perform a POST request with an optional JSON body. */
    post: <TData>(
      url: Endpoint,
      body?: unknown,
      opts?: Omit<RequestConfig, 'method' | 'url' | 'body'>
    ) => request<TData>({ ...opts, method: 'POST', url, body }),

    /** Perform a PUT request with an optional JSON body. */
    put: <TData>(
      url: Endpoint,
      body?: unknown,
      opts?: Omit<RequestConfig, 'method' | 'url' | 'body'>
    ) => request<TData>({ ...opts, method: 'PUT', url, body }),

    /** Perform a PATCH request with an optional JSON body. */
    patch: <TData>(
      url: Endpoint,
      body?: unknown,
      opts?: Omit<RequestConfig, 'method' | 'url' | 'body'>
    ) => request<TData>({ ...opts, method: 'PATCH', url, body }),

    /** Perform a DELETE request. */
    delete: <TData>(
      url: Endpoint,
      opts?: Omit<RequestConfig, 'method' | 'url' | 'body'>
    ) => request<TData>({ ...opts, method: 'DELETE', url }),
  }
}

export { createHttpClient }
export type {
  HttpMethod,
  Endpoint,
  RequestConfig,
  ApiError,
  Middleware,
  FetchFn,
  ClientOptions,
}