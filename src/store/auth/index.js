import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class AuthState extends StoreModule {

  initState() {
    return {
      userData: {},
      error: '',
      waiting: false // признак ожидания загрузки
    }
  }

  //вход пользователя, получение токена
  async logInUser(login, password) {
    this.setState({
      userData: {},
      error: '',
      waiting: true
    })
    const sendData = {
      "login": login,
      "password": password
    }
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      })
      const userJson = await response.json();
      if (userJson.result) {
        this.setState({
          userData: userJson.result.user,
          error: '',
          waiting: false
        }, 'Загружена информация о пользователе из АПИ');
        return true
      } else {
        this.setState({
          userData: {},
          error: userJson.error.message,
          waiting: false
          }, 'Что-то пошло не так')
          return false
        };
    } catch (error) {
      this.setState({
        error: error.message,
        waiting: false
      }, 'Ошибка!');
    }
  }

  //выход пользователя
  async logOutUser(token) {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: "DELETE",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        }});

        this.setState({
          userData: {},
          error: '',
          waiting: false
        }, 'Пользователь вышел из системы');

    } catch (error) {
      console.log(error.message)
      return error.message
    }
  }
}

export default AuthState;