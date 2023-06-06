import storeModule from "../module";

class AuthUser extends storeModule {
  initState() {
    return {
      user: null,
      wait: false,
      err: null,
    };
  }

  // Авторизация пользователя
  async signIn(valueLog, valuePass) {
    this.setState({
      ...this.getState(),
      wait: true,
    });
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        body: JSON.stringify({
          login: valueLog,
          password: valuePass,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json.error) {
        this.setState({
          user: null,
          wait: false,
          err: json.error.code,
        });
      } else {
        this.setState(
          {
            ...this.getState(),
            user: json.result.user,
            wait: false,
          },
          "Пользователь загружен"
        );
        localStorage.setItem("userToken", json.result.token);
      }
    } catch (e) {
      this.setState({
        user: null,
        wait: false,
        err: e,
      });
    }
  }
  // Получение токена
  async getUserToken() {
    this.setState({
      ...this.getState(),
      wait: true,
    });
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await fetch("/api/v1/users/self", {
        headers: {
          "Content-Type": "application/json",
          "X-token": userToken,
        },
      });
      console.log("response", response);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        user: json.result,
        wait: false,
      });
    } catch (e) {
      this.setState({
        user: null,
        wait: false,
        err: e,
      });
    }
  }
  // Сброс Пользователя
  signOut() {
    localStorage.removeItem("userToken");
    this.setState({
      ...this.getState(),
      user: null,
    });
  }
}

export default AuthUser;
