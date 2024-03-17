
import StoreModule from "../module";

/**
 * Покупательская корзина
 */
class AuthState extends StoreModule {

  initState() {
    return {
      token: '',
      user: {},
      error: '',
      waiting: false,
      isAuth: false,
    }
  }

  /**
   * Авторизация пользователя
   * @param data {Object} Почта и пароль
   */
  async login(data) {
    this.setState({
      ...this.getState(),
      waiting: true,
    })
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      const { token, user } = json.result;

      localStorage.setItem('token', token);

      this.setState({
        ...this.getState(),
        token,
        user,
        waiting: false,
        error: '',
        isAuth: true,
      }, 'Авторизация успешна');
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
        waiting: false,
        isAuth: false,
      }, 'Авторизация провалена');
    }
  }

  /**
     * Получение данных о пользователе
     * 
     */
  async getUserInfo() {
    const body = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": this.getState().token,
      },
    };
    const token = localStorage.getItem('token');
    if (!token) {
      // Если токен отсутствует, выходим из функции
      console.error('Token is not available');
      return;
    }
    const response = await fetch('/api/v1/users/self?fields=*', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    });

    const { result } = await response.json();
    this.setState({
      ...this.getState(),
      token,
      user: result,
      isAuth: true,
    }, 'Получение данных пользователя');
  }

  /**
   * Выход пользователя
   * 
   */

  async logOut() {

    const response = await fetch('/api/v1/users/sign', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": this.getState().token,
      },
    });

    localStorage.setItem('token', "");

    this.setState({
      ...this.getState(),
      token: '',
      user: {},
      isAuth: false,
    }, 'Выход успешен');
  }
}

export default AuthState;
