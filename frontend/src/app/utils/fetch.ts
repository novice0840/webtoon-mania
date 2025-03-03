const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class Fetch {
  static async get(url: string, params = {}, options: any = {}) {
    return await this.request(url, params, { ...options, method: "GET" });
  }

  static async post(url: string, params = {}, options: any = {}) {
    return await this.request(url, params, { ...options, method: "POST" });
  }

  static async put(url: string, params = {}, options: any = {}) {
    return await this.request(url, params, { ...options, method: "PUT" });
  }

  static async delete(url: string, params = {}, options: any = {}) {
    return await this.request(url, params, { ...options, method: "DELETE" });
  }

  static async request(
    baseUrl: string,
    params: Record<string, any> = {},
    options: any = {},
  ) {
    try {
      const filteredParams: Record<string, string> = Object.fromEntries(
        Object.entries(params)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)]),
      );

      const queryString = new URLSearchParams(filteredParams).toString();
      const url =
        BASE_URL + "/" + (queryString ? `${baseUrl}?${queryString}` : baseUrl);
      console.log(BASE_URL, url);
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default Fetch;
