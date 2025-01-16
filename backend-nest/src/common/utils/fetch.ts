class Fetch {
  static async get(url: string, params = {}, options: any = {}) {
    return await this.request(url, { ...options, method: 'GET' });
  }

  static async post(url: string, params = {}, options: any = {}) {
    return await this.request(url, { ...options, method: 'POST' });
  }

  static async put(url: string, params = {}, options: any = {}) {
    return await this.request(url, { ...options, method: 'PUT' });
  }

  static async delete(url: string, params = {}, options: any = {}) {
    return await this.request(url, params, { ...options, method: 'DELETE' });
  }

  static async request(baseUrl: string, params = {}, options: any = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${baseUrl}?${queryString}`;
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default Fetch;
