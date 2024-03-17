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
      errorMessage: '',
      waiting: false,
    }
  }
    // test_1 123456

    async loginByToken(token) {

      this.setState({
        ...this.getState(),
        isLogin: false,
        waiting: true,
      }, 'Установлены параметры логина');

      const response = await fetch(`/api/v1/users/self?fields=*`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", "X-Token": token,
        },
      });

      const json = await response.json();

      if (response.ok) {

        this.setState({
          ...this.getState(),
          isLogin: true,
          userData: {
            name: json.result.profile?.name,
            email: json.result.email,
            phone: json.result.profile?.phone,
          },
          waiting: false,
        }, 'Логин по Токену');
      }
    }

  async loginByEmail(loginName, password) {

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

    if (response.ok) {
      const token = json.result.token;
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
      }, 'Логин по логину и почте');
    }

    this.setState({
      ...this.getState(),
      errorMessage: json.error?.message,
    }, 'Ошибка сервера');
  }

 async logout(){
  const token = JSON.parse(localStorage.getItem("XToken"));


  await fetch("/api/v1/users/sign", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Token": token,
    },
  });

  this.setState({
    ...this.getState(),
    isLogin: false,
  }, 'Логаут');

  localStorage.removeItem("XToken");
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
