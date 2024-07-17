import axios from "axios";

export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
}

export class PokeApiFetchAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    const resp = await fetch(url);
    const data: T = await resp.json();
    return data;
  }
}

export class PokeApiAdapter implements HttpAdapter {
  private readonly axios = axios;

  async get<T>(ulr: string): Promise<T> {
    const { data } = await this.axios.get<T>(ulr);
    return data;
  }

  async post(ulr: string, data: any) {
    // Petición post
  }

  async put(ulr: string, data: any) {
    // Petición put
  }

  async patch(ulr: string, data: any) {
    // Petición patch
  }

  async delete(ulr: string, data: any) {
    // Petición delete
  }
}
