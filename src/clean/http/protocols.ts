export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
}

export interface HttpResponse {
  status: number;
  data?: any;
}

export interface Controller {
  (req: HttpRequest): Promise<HttpResponse>;
}

export const created = (data?: any): HttpResponse => ({
  data,
  status: 201,
});

export const badRequest = (data?: any): HttpResponse => ({
  data,
  status: 400,
});
