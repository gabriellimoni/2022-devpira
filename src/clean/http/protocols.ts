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
