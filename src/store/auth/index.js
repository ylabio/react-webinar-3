import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class AuthState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      isLogin: false,
      error: "",
      userName: "",
      waiting: false,
      token: JSON.parse(window.localStorage.getItem("XToken")) || null,
    };
  }

  async checkLogin() {
    if (this.getState().token) {
      this.setState({
        ...this.getState(),
        isLogin: false,
        waiting: true,
      });
      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token": this.getState().token,
        },
      });

      const json = await response.json();

      this.setState({
        ...this.getState(),
        isLogin: true,
        error: "",
        userName: json.result.profile.name,
        waiting: false,
      });
    }
  }

  async login(login, password) {
    const loginData = { login: login, password: password };

    this.setState({
      ...this.getState(),
      isLogin: false,
      waiting: true,
      error: "",
    });

    const response = await fetch("/api/v1/users/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const json = await response.json();

    if (response.status === 200) {
      window.localStorage.setItem("XToken", JSON.stringify(json.result.token));
      console.log("LOGIN RESPONSE");
      console.log(json);

      this.setState(
        {
          isLogin: true,
          userName: json.result.user.profile.name,
          error: "",
          waiting: false,
          token: json.result.token,
        },
        "Загружен X-Token"
      );
    } else {
      this.setState(
        {
          userName: "",
          isLogin: false,
          error: json.error.data.issues[0].message,
          waiting: false,
        },
        "Получена ошибка"
      );
    }
    return json;
  }

  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    const response = await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": this.getState().token,
      },
    });

    this.setState({
      isLogin: false,
      error: "",
      userName: "",
      waiting: false,
      token: null,
    });

    window.localStorage.removeItem("XToken");
  }
}

export default AuthState;
