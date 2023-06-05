import StoreModule from "../module";

/**
 * Данные о профиле пользователя
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      user: {},
      userName: "",
      token: "",
      error: "",
    };
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
          error: e.message,
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

  setToken(token) {
    const currentState = this.getState();
    this.setState(
      {
        ...currentState,
        token: token,
      },
      "Сохранить токен в стейте"
    );
  }
}

export default ProfileState;
