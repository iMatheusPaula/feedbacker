import type { UseFetchOptions } from '#app'

export function useApiFetch<T> (url: string, options: UseFetchOptions<T> = {}) {
  let headers: any = {}
  //GET COOKIE
  const token: string | null | undefined = useCookie('XSRF-TOKEN').value
  if(token){
    headers['X-XSRF-TOKEN'] = token as string;
  }
  if(process.server){
    headers = {
      ...headers,
      ...useRequestHeaders(["referer", "cookie"])
    }
  }
  //LOGIN HANDLER
  return useFetch("/laravel" + url, {
    credentials: "include",
    ...options,
    headers: {
      ...headers,
      ...options?.headers
    }
  });
}
