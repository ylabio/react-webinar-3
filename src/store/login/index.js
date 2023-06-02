import StoreModule from "../module";

/**
 * Авторизация
 */
class LoginState extends StoreModule {
  initState() {
    return {
      token: "",
      user: "",
      userProfile: {},
      err: "",
      waiting: false, // признак ожидания загрузки
    };
  }

  async sign(login, password) {
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        const { result } = await response.json();
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", result.user.profile.name);
        this.setState(
          {
            token: result.token,
            user: result.user.profile.name,
            waiting: false,
          },
          "Авторизация прошла успешно"
        );
      }
    } catch (error) {
      this.setState({
        err: error.message,
        waiting: false,
      });
    }
  }

  async logOut(token) {
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        const { result } = await response.json();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState(
          {
            token: "",
            waiting: false,
          },
          "Деавторизация прошла успешно"
        );
      }
    } catch (error) {
      this.setState({
        err: error.message,
        waiting: false,
      });
    }
  }

  async getProfile(token) {
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        const { result } = await response.json();
        this.setState(
          {
            userProfile: {
              userName: result.profile.name,
              userPhone: result.profile.phone,
              userMail: result.email,
            },
            waiting: false,
          },
          "Загружена информация о пользователе"
        );
      }
    } catch (error) {
      this.setState({
        err: error.message,
        waiting: false,
      });
    }
  }
}

export default LoginState;
