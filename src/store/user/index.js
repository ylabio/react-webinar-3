import StoreModule from "../module";
import { getCookie, setCookie, deleteCookie } from "../../cookie";

/**
 * Детальная информация о товаре для страницы товара
 */
class UserState extends StoreModule {

  initState() {
    return {
      user: null,
      errorMessage: '',
      waiting: false, // признак ожидания загрузки
    }
  }

  initUser() {
    const accessToken = getCookie("token");
    if (accessToken && !this.getState().user) {
      this.getUserRequest(accessToken);
    }
  }

  /**
   * Логин по почте и паролю
   * @param email {String}
   * @param password {String}
   * @return {Promise<void>}
   */
  async login(email, password) {
    console.log('login');
    console.log(`${email}: ${password}`);
    this.setState({
      user: null,
      errorMessage: "",
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: email,
          password: password,
          remember: true,
        })
      });
      if (response && response.ok) {
        const json = await response.json();
        deleteCookie("token");
        console.log(response);
        console.log(json);
        console.log(`setting cookie for ${json.result.token}`);
        setCookie("token", json.result.token);
        this.setState({
          user: json.result,
          errorMessage: "",
          waiting: false,
        }, 'Пользователь залогинился');
      } else if (response) {
        const json = await response.json();
        this.setState({
          ...this.getState(),
          errorMessage: `Ошибка ${json.error.code}: ${json.error.message}`,
          waiting: false,
        }, 'Пользователь не залогинился');
      }
    } catch (e) {
      // Ошибка при логине
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        user: null,
        errorMessage: "Не удалось получить информацию с сервера",
        waiting: false
      });
    }
  }

  async getUserRequest(accessToken) {
    console.log("getUserRequest");
    this.setState({
      user: null,
      errorMessage: "",
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        method: 'GET',
        headers: {
          'X-Token': accessToken,
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      if (response && response.ok) {
        const json = await response.json();
        console.log('response:');
        console.log(json);
        this.setState({
          user: json.result,
          errorMessage: "",
          waiting: false,
        }, 'Данные о пользователе получены');
      } else if (response) {
        const json = await response.json();
        console.log('response error');
        console.log(json);
        this.setState({
          ...this.getState(),
          errorMessage: `Ошибка ${json.error.code}: ${json.error.message}`,
          waiting: false,
        }, 'Не удалось получить данные о пользователе');
      }
    } catch (e) {
      // Ошибка при логине
      // @todo В стейт можно положить информацию об ошибке
      console.log("error");
      console.log(e);
      this.setState({
        user: null,
        errorMessage: "Не удалось получить информацию с сервера",
        waiting: false,
      });
    }
  }

  async logout() {    
    console.log('logout');
    const accessToken = getCookie("token");
    this.setState({
      user: null,
      errorMessage: "",
      waiting: false
    }, 'Пользователь вышел');
    console.log('before try block');
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': accessToken,
        },
      });
      console.log('response: ');
      console.log(response);
      if (response && response.ok) {
        console.log('deleting cookie');
        deleteCookie("token");
        this.setState({
          ...this.getState(),
          errorMessage: "",
          waiting: false,
        }, 'Пользователь вышел');
      } else if (response) {
        const json = await response.json();
        this.setState({
          ...this.getState(),
          errorMessage: `Ошибка ${json.error.code}: ${json.error.message}`,
          waiting: false,
        }, 'Пользователь не смог выйти');
      }
  
    } catch (e) {
      // Ошибка при логине
      // @todo В стейт можно положить информацию об ошибке
      console.log('error');
      console.log(e);
      this.setState({
        user: null,
        errorMessage: "Не удалось выйти из учетной записи",
        waiting: false
      });
    }
  }
}

export default UserState;
