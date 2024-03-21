import StoreModule from "../module";

class LoginState extends StoreModule {

  initState() {
    return {
      loginData: {
        loginName: '',
        token: JSON.parse(localStorage.getItem("XToken")) || '',
      },
      isLogin: false,
      errorMessage: '',
      waiting: false,
    }
  }
    // test_1 123456
    clearErrorMessage(){
      this.setState({
        ...this.getState(),
        errorMessage: '',
      }, 'Очищено сообщение об ошибке');
    }


    async loginByToken() {
      const token = JSON.parse(localStorage.getItem("XToken"));
      this.setState({
        ...this.getState(),
        isLogin: false,
        errorMessage: '',
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
          loginData: {
            loginName: json.result.profile?.name,
          },
          isLogin: true,
          waiting: false,
        }, 'Логин по Токену');
      }
    }

  async loginByEmail(loginName, password) {

    this.setState({
      ...this.getState(),
      isLogin: false,
      errorMessage: '',
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
        loginData: {
          loginName: json.result.user.profile?.name,
          token: json.result.token,
        },
        isLogin: true,
        waiting: false,
      }, 'Логин по логину и почте');
    }

    this.setState({
      ...this.getState(),
      errorMessage: json.error?.data.issues[0].message,

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
}

export default LoginState;
