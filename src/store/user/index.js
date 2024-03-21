
import StoreModule from "../module";

/**
 * Покупательская корзина
 */
class UserState extends StoreModule {

  initState() {
    return {
      info: {},
      error: '',
      waiting: false,
      // isAuth: false,
    }
  }

  /**
   * Авторизация пользователя
   * @param data {Object} Почта и пароль
   */

  /**
     * Получение данных о пользователе
     * 
     */
  async getUserInfo() {
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
    // const user = {
    //   ...result.profile,
    //   email: result.email
    // };
    // console.log(user)
    this.setState({
      ...this.getState(),
      token,
      info: result,
      isAuth: true,
    }, 'Получение данных пользователя');
  }
}

export default UserState;