import StoreModule from "../module";

/**
 * Покупательская корзина
 */
class LoginState extends StoreModule {

  initState() {
    return {
      loginData: {
        loginName: '',
        password: ''
      },
      isLogin: false,
      isValid: false,
      errorMessage: '',
    }
  }

 async login(){

  const loginName = '';
  const password = '';

  this.setState({
    ...this.getState(),
    loginName,
    password,
  }, 'Логин');
 }

 async logout(){

  const loginName = '';
  const password = '';

  this.setState({
    ...this.getState(),
    loginName,
    password,
  }, 'Логаут');
 }

}

export default LoginState;
