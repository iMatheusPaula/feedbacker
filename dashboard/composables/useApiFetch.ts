import type { UseFetchOptions } from '#app';
export function useApiFetch<T> (url: string, options: UseFetchOptions<T> = {}) {
  let headers: any = {};
  const token: string | null | undefined = useCookie('XSRF-TOKEN').value;
  if(token) headers['X-XSRF-TOKEN'] = token as string;
  if(process.server){
    headers = {
      ...headers,
      ...useRequestHeaders(["referer", "cookie"])
    }
  }
  return useFetch(useRuntimeConfig().public.API_URL + url, {
    credentials: "include",
    ...options,
    headers: {
      Accept: 'application/json',
      ...headers,
      ...options?.headers
    }
  });
}
