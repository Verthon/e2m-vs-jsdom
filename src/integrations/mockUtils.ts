import { http, type DefaultBodyType, type HttpResponse as MSWHttpResponse } from 'msw';
import { worker } from './mockServer';

export const createMockResponse = <Response extends DefaultBodyType>(baseUrl: string) => {
  return (
    method: 'get' | 'post' | 'delete' | 'put' | 'patch',
    endpoint: string,
    response: MSWHttpResponse<Response>
  ) => {
    const fullUrl = `${baseUrl}${endpoint}`;
    //@ts-expect-error kek
    worker.use(http[method](fullUrl, () => response));
  };
};
