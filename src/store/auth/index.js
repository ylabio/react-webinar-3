import StoreModule from '../module';
import api from '../../api/index';

class AuthStore extends StoreModule {
  initState() {
    return {
      token: null,
      user: null,
      loading: false,
      error: null,
      initialized: false,
    };
  }

  // Установка состояния загрузки
  setLoading(loading) {
    this.setState({
      ...this.getState(),
      loading,
    });
  }

  // Установка ошибки
  setError(error) {
    this.setState({
      ...this.getState(),
      error: Array.isArray(error) ? error : [error],
    });
  }

  // Сохранение токена
  async setToken(token) {
    console.log('Сохранение токена:', token);
    localStorage.setItem('authToken', token);
    this.setState({
      ...this.getState(),
      token,
      error: null,
    });
  }

  // Очистка авторизации
  async clearAuth() {
    localStorage.removeItem('authToken');
    this.setState({
      token: null,
      user: null,
      loading: false,
      error: null,
      initialized: true,
    });
  }

  // Установка данных пользователя
  async setUser(user) {
    this.setState({
      ...this.getState(),
      user,
      error: null,
    });
  }

  // Авторизация пользователя
  async login(credentials) {
    this.setLoading(true);
    try {
      // 1. Отправляем запрос на сервер

      const response = await fetch('api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: credentials.login,
          password: credentials.password,
        }),
      });
      console.log('Отправляемые credentials:', credentials);

      const json = await response.json().catch(() => null);
      console.log('JSON ответа:', json);

      // 2. Обрабатываем ответ сервера
      if (!response.ok) {
        // Если есть ошибка от сервера
        const issues = json?.error?.data?.issues
          ? json.error.data.issues.map(issue => issue.message || issue)
          : [json.error?.message || 'Ошибка авторизации'];

        throw new Error(JSON.stringify({ issues }));
      }

      // 3. Если ответ успешный
      const { token, user } = json.result || {};

      if (!token) {
        const error = new Error('Authorization failed');
        error.errorData = {
          message: 'Токен не получен',
          issues: ['Неверные учетные данные'],
        };
        throw error;
      }

      // 4. Сохраняем данные авторизации
      localStorage.setItem('authToken', token);
      this.setState({
        ...this.getState(),
        token,
        user,
        error: null,
        initialized: true,
      });
      await this.store.actions.profile.loadProfile(token);
      return true;
    } catch (error) {
      // 5. Обрабатываем ошибки
      const errorData = error.errorData || {
        message: error.message,
        issues: ['Ошибка авторизации'],
      };

      this.setError(errorData.issues);

      const newError = new Error(errorData.message);
      newError.errorData = errorData;
      throw newError;
    } finally {
      this.setLoading(false);
    }
  }

  // Выход из системы
  async logout() {
    this.setLoading(true);
    try {
      const { token } = this.getState();
      if (token) {
        try {
          await api.signOut(token);
        } catch (e) {
          console.log('Ошибка при выходе (возможно токен уже недействителен)');
        }
      }
      await this.clearAuth();
      await this.getStore().profile.clearProfile();
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      this.setError(error.issues || ['Ошибка при выходе']);
    } finally {
      this.setLoading(false);
    }
  }

  // Инициализация авторизации (при загрузке приложения)

  async init() {
    // Если уже инициализировано, пропускаем
    if (this.getState().initialized) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      this.setState({ ...this.getState(), initialized: true });
      return;
    }

    try {
      const isValid = await api.checkAuth(token);
      await this.store.actions.profile.loadProfile(token);
      if (isValid) {
        //await this.loadProfile();
        const user = await api.getProfile(token);
        this.setState({
          token,
          user,
          error: null,
          initialized: true,
          loading: false,
        });
      } else {
        await this.clearAuth();
      }
    } catch (error) {
      await this.clearAuth();
    }
  }
}

export default AuthStore;
