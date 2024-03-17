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
      user: {
        name: "",
        phoneNumber: "",
        email: "",
      },
      waiting: false,
    };
  }

  async checkLogin() {
    const token = JSON.parse(window.localStorage.getItem("XToken"));
    if (token) {
      this.setState({
        ...this.getState(),
        isLogin: false,
        waiting: true,
      });
      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });

      const json = await response.json();
      console.log("check login");
      console.log(json);

      this.setState({
        isLogin: true,
        error: "",
        user: {
          name: json.result.profile.name,
          phoneNumber: json.result.profile.phone,
          email: json.result.email,
        },
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

      this.setState(
        {
          isLogin: true,
          user: {
            name: json.result.user.profile.name,
            phoneNumber: json.result.user.profile.phone,
            email: json.result.user.email,
          },
          error: "",
          waiting: false,
        },
        "Загружен X-Token"
      );
    } else {
      this.setState(
        {
          ...this.getState(),
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
    const token = JSON.parse(window.localStorage.getItem("XToken"));
    this.setState({
      ...this.getState(),
      isLogin: true,
      waiting: true,
    });
    const response = await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    });

    this.setState({
      isLogin: false,
      error: "",
      user: {
        name: "",
        phoneNumber: "",
        email: "",
      },
      waiting: false,
    });

    // delete XToken from localstorage
    window.localStorage.removeItem("XToken");
  }
}

export default AuthState;
