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
      userData: {
        name: '',
        email: '',
        phone: '',
      },
      isLogin: false,
      isValid: false,
      errorMessage: '',
      waiting: false,
    }
  }

  async login(loginName='test_1', password='123456') {
  console.log('login({loginName, password})' , loginName, password);

    this.setState({
      ...this.getState(),
      isLogin: false,
      waiting: true,
    }, 'Установлены параметры логина');

    const response = await fetch(`/api/v1/users/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({login: loginName, password: password}),
    });

    const json = await response.json();
    console.log('json', json);

    if (response.ok) {
      const token = json.result.token;
      console.log('token', token);
      localStorage.setItem("XToken", JSON.stringify(token));

      this.setState({
        ...this.getState(),
        isLogin: true,
        userData: {
          name: json.result.user.profile?.name,
          email: json.result.user.email,
          phone: json.result.user.profile?.phone,
        },
        waiting: false,
      }, 'Логин');
    }

    this.setState({
      ...this.getState(),
      errorMessage: json.error?.message,
    }, 'Ошибка сервера');
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

//  validate(loginName, password){
//   const checkOneNumber = /(?=.*[0-9])/g;
//   const checkOneLowerLatinSimbol = /(?=.*[a-z])/;
//   const checkOneUpperLatinSimbol = /(?=.*[A-Z])/;
//   const checkSpecialSimbols = /(?=.*[!@#$%^&*])/;
//   const checkLenght = /[0-9a-zA-Z!@#$%^&*]{8,}/;
//   const checkWhiteSpace = /^\s|\s$/;
//   const checkEmail = /[a-z0-9]+[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;
//  }

}

export default LoginState;
