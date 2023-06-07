import StoreModule from "../module";

/**
 * Данные пользователя
 */
class UserState extends StoreModule {
  initState() {
    return {
      user: {},
      userName: "",
      token: "",
      error: "",
      isAuth: false,
    };
  }

  setToken(token) {
    const currentState = this.getState();
    this.setState(
      {
        ...currentState,
        token: token,
        isAuth: true,
      },
      "Сохранить токен в стейте"
    );
  }

  /**
   *  Авторизация пользователя
   * @param [user] {Object} данные пользователя
   */

  async signIn(user) {
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const { result } = await response.json();

      // Пользователь авторизован
      const currentState = this.getState();
      this.setState(
        {
          ...currentState,
          token: result.token,
          userName: result.user.username,
          isAuth: true,
        },
        "Пользователь авторизован"
      );
      localStorage.setItem("token", JSON.stringify(result.token));
    } catch (e) {
      // Ошибка авторизации
      const currentState = this.getState();
      this.setState(
        {
          ...currentState,
          error: e.message,
          isAuth: false,
        },
        "Пользователь не авторизован"
      );
    }
  }

  /**
   * Удаление данных о пользователе
   * @param token {String} токен пользователя
   */

  async signOut() {
    const res = await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": this.getState().token,
      },
    });
    if (res.ok) {
      this.setState(
        {
          ...this.initState(),
          isAuth: false,
        },
        "Ошибка логина"
      );
      localStorage.removeItem("token");
      const data = await res.json();
    }
  }
}

export default UserState;
