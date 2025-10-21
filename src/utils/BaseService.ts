// utils/BaseService.ts
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "./interceptor";

export default class BaseService {
  protected http: AxiosInstance;

  constructor(httpClient?: AxiosInstance) {
    this.http = httpClient || api;
  }

  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.http.get<T>(url, config);
  }

  protected post<T>(
    url: string,
    data,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.http.post<T>(url, data, config);
  }

  protected put<T>(
    url: string,
    data,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.http.put<T>(url, data, config);
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.http.delete<T>(url, config);
  }
}
