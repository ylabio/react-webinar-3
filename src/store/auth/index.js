import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class AuthState extends StoreModule {

  initState() {
    return {
      isAuth: false,
    }
  }

  setAuth() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ ...this.getState(), isAuth: true });
    } else {
      this.setState({ ...this.getState(), isAuth: false });
    }
  }

}

export default AuthState;
