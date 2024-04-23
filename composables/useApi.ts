import type { UseFetchOptions } from '#app'
import { defu } from 'defu'

export function useApi<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()
  const appStore = useAppStore()
  const { $auth } = useNuxtApp()
  //@ts-ignore
  const token = $auth.strategy?.token.get() || undefined

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBase as string,
    // cache request
    key: url + new Date().getTime().toString(), // not cache

    // set user token if connected
    headers: {
      authorization: token,
    },

    onResponse({ request, response, options }) {},

    onResponseError({ request, response, options }) {
      appStore.newError({
        code: response._data?.statusCode || 500,
        message: response?._data?.message || response?._data?.key,
      })
    },
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return useFetch(url, params)
}
