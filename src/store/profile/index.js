import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      userData: {},
      error: '',
      waiting: false // признак ожидания загрузки
    }
  }

  logInUser() {
    this.setState({
        userData: store.auth.userData,
        error: store.auth.error,
        waiting: false
      }, 'Загружена информация о пользователе по токену');
  }

 //загрузка пользователя по токену
 async loadUser(token) {
  try {
    const response = await fetch('/api/v1/users/self?fields=*', {
      method: "GET",
      headers: {
        "X-Token": token,
        "Content-Type": "application/json",
      }});

    const userJson = await response.json();
    if (userJson.result) {
      this.setState({
        userData: userJson.result,
        error: '',
        waiting: false
      }, 'Загружена информация о пользователе по токену');
      return true
    } else {
      this.setState({
        userData: {},
        error: userJson.error.message,
        waiting: false
      }, 'Пользователь не был ранее авторизован');
      return false
    }
  } catch (error) {
    console.log(error.message)
  }
 }
}

export default ProfileState;