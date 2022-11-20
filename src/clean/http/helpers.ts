import { HttpResponse } from "./protocols";

export const created = (data?: any): HttpResponse => ({
  status: 201,
  data,
});

export const badRequest = (data?: any): HttpResponse => ({
  status: 400,
  data,
});
