import Axios, {AxiosRequestConfig, CancelTokenSource} from 'axios';

// import {logger} from '@/lib/default-logger';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? import.meta.env.VITE_PUBLIC_BASE_URL || ''
    : import.meta.env.VITE_API_BASE_URL || '';

export const AXIOS_INSTANCE = Axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL || '',
  baseURL,
});

AXIOS_INSTANCE.interceptors.request.use(
  async (config) => {
    try {
      // const token = '';
      // if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error('auth session error: ', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

type CancelablePromise<T> = Promise<T> & {cancel: () => void};

// add a second `options` argument here if you want to pass extra options to each generated query
export const customAxios = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): CancelablePromise<T> => {
  const source: CancelTokenSource = Axios.CancelToken.source();

  // 배열 parameter 쿼리스트링 키에 []가 붙지 않도록 처리.
  if (config.params) {
    const searchParams = new URLSearchParams();
    for (const key in config.params) {
      if (Array.isArray(config.params[key])) {
        config.params[key].forEach((value) => {
          searchParams.append(key, value);
        });
      } else {
        if (config.params[key]) {
          searchParams.set(key, config.params[key]);
        }
      }
    }
    config.params = searchParams;
  }

  const promise: CancelablePromise<T> = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({data}) => data) as CancelablePromise<T>;

  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

// //? In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
// export type ErrorType<Error> = AxiosError<Error>;

// export type BodyType<BodyData> = BodyData;

// //? Or, in case you want to wrap the body type (optional)
// //? (if the custom instance is processing data before sending it, like changing the case for example)
// export type BodyType<BodyData> = CamelCase<BodyData>;
