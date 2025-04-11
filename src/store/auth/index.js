import StoreModule from '../module';
import api from '../../api/index';

class AuthStore extends StoreModule {
  initState() {
    return {
      token: localStorage.getItem('authToken') || null,
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
      const { token, user } = await api.signIn(credentials);

      if (!token) {
        const error = new Error('Authorization failed');
        error.errorData = {
          message: 'Токен не получен',
          issues: ['Неверные учетные данные'],
        };
        throw error;
      }

      localStorage.setItem('authToken', token);
      this.setState({
        ...this.getState(),
        token,
        user,
        error: null,
        initialized: true,
      });

      return true;
    } catch (error) {
      // Используем errorData если есть, иначе создаем стандартную ошибку
      const errorData = error.errorData || {
        message: error.message,
        issues: ['Ошибка авторизации'],
      };

      this.setError(errorData.issues);
      // Пробрасываем ошибку с errorData
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
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      this.setError(error.issues || ['Ошибка при выходе']);
    } finally {
      this.setLoading(false);
    }
  }

  // Загрузка профиля пользователя
  async loadProfile() {
    const { token } = this.getState();
    if (!token) return null;

    this.setLoading(true);
    try {
      const user = await api.getProfile(token);
      this.setState({
        ...this.getState(),
        user,
      });
      return user;
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  // Инициализация авторизации (при загрузке приложения)

  async init() {
    // Если уже инициализировано, пропускаем
    if (this.getState().initialized) return;

    const { token } = this.getState();
    if (!token) {
      this.setState({ initialized: true });
      return;
    }

    try {
      const isValid = await api.checkAuth(token);
      if (isValid) {
        await this.loadProfile();
      } else {
        await this.clearAuth();
      }
    } catch (error) {
      await this.clearAuth();
    } finally {
      this.setState({ initialized: true });
    }
  }
}

export default AuthStore;
