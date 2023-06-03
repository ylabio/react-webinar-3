import StoreModule from "../module";

/**
 * Данные пользователя
 */
class UserState extends StoreModule {
  initState() {
    return {
      user: {},
      userName: "",
      isAuthenticated: false,
      token: "",
      error: "",
    };
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
          isAuthenticated: true,
        },
        "Пользователь авторизован"
      );
    } catch (e) {
      // Ошибка авторизации
      const currentState = this.getState();
      this.setState(
        {
          ...currentState,
          error: e.error.message,
        },
        "Пользователь не авторизован"
      );
    }
  }

  /**
   * Загрузка данных о пользователе
   * @param token {String} токен пользователя
   */

  async loadData(token) {
    const currentState = this.getState();
    this.setState({
      ...currentState,
      user: {},
      isAuthenticated: true,
    });

    try {
      const response = await fetch("/api/v1/users/self", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });

      const { result } = await response.json();

      // Пользователь авторизован
      this.setState(
        {
          ...currentState,
          user: { ...result },
        },
        "Данные пользователя загружены"
      );
    } catch (e) {
      // Ошибка загрузки

      this.setState(
        {
          ...currentState,
          error: e.error.message,
        },
        "Данные пользователя не загружены"
      );
    }
  }

  /**
   * Выход из системы
   */

  exit() {
    this.setState(this.initState(), "Пользователь разлогинился");
  }
}

export default UserState;
