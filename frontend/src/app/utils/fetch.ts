const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class Fetch {
  static async get<T>(
    url: string,
    params: Record<string, any> = {},
    options: RequestInit = {},
  ): Promise<T> {
    return await this.request<T>(url, params, { ...options, method: "GET" });
  }

  static async post<T>(
    url: string,
    params: Record<string, any> = {},
    options: RequestInit = {},
  ): Promise<T> {
    return await this.request<T>(url, params, { ...options, method: "POST" });
  }

  static async put<T>(
    url: string,
    params: Record<string, any> = {},
    options: RequestInit = {},
  ): Promise<T> {
    return await this.request<T>(url, params, { ...options, method: "PUT" });
  }

  static async delete<T>(
    url: string,
    params: Record<string, any> = {},
    options: RequestInit = {},
  ): Promise<T> {
    return await this.request<T>(url, params, { ...options, method: "DELETE" });
  }

  static async request<T>(
    baseUrl: string,
    params: Record<string, any> = {},
    options: RequestInit = {},
  ): Promise<T> {
    try {
      const filteredParams: Record<string, string> = Object.fromEntries(
        Object.entries(params)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)]),
      );

      const queryString = new URLSearchParams(filteredParams).toString();
      const url =
        BASE_URL + "/" + (queryString ? `${baseUrl}?${queryString}` : baseUrl);

      const response = await fetch(url, options);
      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error; // 에러는 호출자가 처리할 수 있게 throw 해주는 것이 좋음
    }
  }
}

export default Fetch;
