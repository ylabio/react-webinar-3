import { ApiError } from "../api-error";

//абстрактный класс.
class ApiClient {
  constructor(baseUrl) {
    if (this.constructor === ApiClient) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.baseUrl = baseUrl;
  }

  async get(endpoint, params = {}) {
    const url = this._buildUrl(endpoint, params);
    const response = await this._makeRequest(url);
    return this._processResponse(response);
  }

  _buildUrl(endpoint, params) {
    const url = new URL(endpoint, this.baseUrl);
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        url.searchParams.append(key, params[key]);
      }
    }
    return url.toString();
  }

  async _makeRequest(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new ApiError(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      throw new ApiError(`Request failed: ${error.message}`);
    }
  }

  async _processResponse(response) {
    try {
      return await response.json();
    } catch (error) {
      throw new ApiError(`Failed to parse JSON response: ${error.message}`);
    }
  }
}

export { ApiClient };
