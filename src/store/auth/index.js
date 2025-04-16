import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    const token = localStorage.getItem('token') || null;
    return {
      user: null,
      token,
      error: null,
      waiting: false,
      isAuth: !!token,
    };
  }

  async _makeRequest(url, method, body = null, headers = {}) {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(url, config);
    const json = await response.json();

    if (!response.ok) {
      const errorMessage =
        json?.error?.data?.issues?.[0]?.message || json?.error?.message || 'Ошибка сервера';
      throw new Error(errorMessage);
    }

    return json;
  }

  _updateAuthState = (newState, message = '') => {
    this.setState(
      {
        ...this.getState(),
        ...newState,
      },
      message,
    );
  };

  //обработка успешной авторизации
  _handleAuthSuccess = (token, user, message) => {
    if (!token) return;

    localStorage.setItem('token', token);
    this._updateAuthState(
      {
        user: user,
        token,
        error: null,
        waiting: false,
        isAuth: true,
      },
      message,
    );
  };

  //обработка ошибок
  _handleAuthError = (error, message = 'Ошибка авторизации') => {
    this._updateAuthState(
      {
        error: error.message,
        waiting: false,
      },
      message,
    );
    return { error: error.message };
  };

  //Очистка данных
  _clearData = () => {
    localStorage.removeItem('token');

    this._updateAuthState({
      user: null,
      token: null,
      error: null,
      waiting: false,
      isAuth: false,
    });
  };

  //авторизация пользователя
  signIn = async (login, password) => {
    this._updateAuthState({ waiting: true });

    try {
      const json = await this._makeRequest('api/v1/users/sign', 'POST', { login, password });
      this._handleAuthSuccess(json.result.token, json.result.user, 'Успешная авторизация');
    } catch (error) {
      this._handleAuthError(error);
    }
  };

  // выход из аккаунта
  signOut = async () => {
    this._updateAuthState({ waiting: true });

    try {
      await this._makeRequest('/api/v1/users/sign', 'DELETE', null, {
        'X-Token': localStorage.getItem('token'),
      });
      this._clearData();
    } catch (error) {
      this._clearData();
      this._handleAuthError(error, 'Ошибка при выходе');
    }
  };

  //проверка авторизации
  checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      this._clearData();
      return false;
    }

    this._updateAuthState({ waiting: true });

    try {
      const json = await this._makeRequest('/api/v1/users/self?fields=_id,username', 'GET', null, {
        'X-Token': token,
      });

      this._handleAuthSuccess(token, json.result, 'В сети');
      return true;
    } catch (error) {
      this._clearData();
      this._handleAuthError(error);
      return false;
    }
  };

  resetErrors = async () => {
    this._updateAuthState({
      error: null,
    });
  };
}
export default AuthState;
