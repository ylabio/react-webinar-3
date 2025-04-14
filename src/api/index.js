const request = async (url, method = 'GET', data = null, headers = {}) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  let response;
  try {
    response = await fetch(url, config);
    let result;
    try {
      result = await response.json();
    } catch (e) {
      result = { error: { message: 'Invalid JSON response' } };
    }

    if (!response.ok) {
      // Формируем объект ошибки в нужном формате
      const errorObj = {
        message: result.error?.message || 'Request failed',
        issues: result.error?.data?.issues || [result.message || 'Unknown error'],
        status: response.status,
      };
      // Создаем ошибку и сохраняем наш объект в свойство errorData
      const error = new Error('API Error');
      error.errorData = errorObj;
      throw error;
    }

    return result;
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      const networkError = new Error('Network error');
      networkError.errorData = {
        message: 'Network error',
        issues: ['Check your internet connection'],
        status: 0,
      };
      throw networkError;
    }
    throw error;
  }
};

// Обертка для работы с токеном (без изменений)
const withToken = (headers = {}, token) => {
  if (token) {
    return {
      ...headers,
      'X-Token': token,
    };
  }
  return headers;
};

// API для работы с авторизацией (signIn метод без изменений)
export default {
  async signIn(credentials) {
    const response = await request('/api/v1/users/sign', 'POST', credentials);
    if (!response.result?.token) {
      throw new Error(
        JSON.stringify({
          message: 'Токен не получен',
          issues: ['Неверные учетные данные'],
        }),
      );
    }
    return {
      token: response.result.token,
      user: response.result.user,
    };
  },

  // Остальные методы без изменений
  async signOut(token) {
    await request('/api/v1/users/sign', 'DELETE', null, withToken({}, token));
  },

  async getProfile(token) {
    const response = await request(
      '/api/v1/users/self?fields=*',
      'GET',
      null,
      withToken({}, token),
    );
    return response.result;
  },

  async checkAuth(token) {
    if (!token) return false;
    try {
      const response = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
        credentials: 'include',
      });
      return response.ok;
    } catch {
      return false;
    }
  },
};
