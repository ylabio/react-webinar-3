import StoreModule from "../module";

/**
 * Проверка на авторизацию
 */
class UserState extends StoreModule {
  initState() {
    return {
      authorized: false,
    };
  }
  setAuthorized(value) {
    this.setState({
      ...this.getState(),
      authorized: value
    });
  }
  setToken(value) {
    this.setState({
      ...this.getState(),
      token: value
    });
  }
  checkAuth() {
    let token = localStorage.getItem('token');
    // Здесь могла бы быть мощная проверка - не фейковый ли токен в нашем localStorage
    // типа такой:
    // fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // })
    if (token){
      this.setAuthorized(true)
    }
    else {
      this.setAuthorized(false)
    }
  }
}
export default UserState;
