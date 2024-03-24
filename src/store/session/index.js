import StoreModule from "../module";

/**
 * Детальная информация о текущем пользователе
 */
class SessionState extends StoreModule {
  initState() {
    return {
      name: "",
      authorized: false,
      token: "",
      error: "",
      waiting: false,
    };
  }

  async clearData() {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Стейт пользователя очищен"
    );

    try {
      await fetch(`/api/v1/users/sign`, {
        method: "DELETE",
        headers: {
          "X-Token": localStorage.getItem("token"),
        },
      });

      localStorage.removeItem("token");

      this.setState(
        {
          name: "",
          authorized: false,
          token: "",
          error: "",
          waiting: false,
        },
        "Стейт сессии очищен"
      );
    } catch (e) {
      localStorage.removeItem("token");

      this.setState(
        {
          name: "",
          authorized: false,
          token: "",
          error: e,
          waiting: false,
        },
        "Стейт сессии очищен / Ошибка удаления сессии с сервера"
      );
    }
  }

  clearError() {
    this.setState(
      {
        ...this.getState(),
        error: "",
      },
      "Поле ошибки очищено"
    );
  }

  /**
   * Запрос авторизации к серверу и получение токена
   * @param authData {{username: String, password: String}}
   * @return {Promise<void>}
   */
  async getToken(authData) {
    this.setState({
      ...this.getState(),
      authorized: false,
      token: "",
      error: "",
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: authData.username,
          password: authData.password,
          remember: true,
        }),
      });

      if (response.ok) {
        const json = await response.json();

        localStorage.setItem("token", json.result.token);

        this.setState(
          {
            ...this.getState(),
            name: json.result.user.profile.name,
            authorized: true,
            token: json.result.token,
            waiting: false,
          },
          "Токен авторизации получен"
        );
        console.log(json.result);
      } else {
        const json = await response.json();

        this.setState(
          {
            ...this.getState(),
            error: json.error.data.issues[0].message,
            waiting: false,
          },
          "Ошибка авторизации"
        );
      }
    } catch (e) {
      console.log("Application error");
      this.setState({
        ...this.getState(),
        data: {},
        error: "Application error",
        waiting: false,
      });
    }
  }

  /**
   * Получение данных своего профиля
   * @return {Promise<void>}
   */
  async getName() {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Восстановление сессии"
    );

    try {
      const response = await fetch(`/api/v1/users/self?fields=profile(name)`, {
        headers: {
          "X-token": localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const json = await response.json();
        // Данные профиля загружены успешно
        this.setState(
          {
            ...this.getState(),
            name: json.result.profile.name,
            authorized: true,
            waiting: false,
          },
          "Сессия восстановлена"
        );
      } else {
        this.setState(
          {
            ...this.getState(),
            authorized: false,
            error: response.statusText,
          },
          "Ошибка при восстановлении сессии"
        );
      }
    } catch (e) {
      console.log("Application error");
      this.setState({
        ...this.getState(),
        authorized: false,
        error: "Application error",
        waiting: false,
      });
    }
  }
}

export default SessionState;
