import StoreModule from "../module";

/**
 * Детальная информация о текущем пользователе
 */
class UserState extends StoreModule {
  initState() {
    return {
      username: "",
      name: "",
      email: "",
      phone: "",
      error: "",
      waiting: false,
    };
  }

  clearData() {
    this.setState(
      {
        username: "",
        name: "",
        email: "",
        phone: "",
        error: "",
        waiting: false, // признак ожидания загрузки
      },
      "Стейт пользователя очищен"
    );
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
   * Получение данных своего профиля
   * @return {Promise<void>}
   */
  async getSelf() {
    this.setState({
      ...this.getState(),
      username: "",
      name: "",
      email: "",
      phone: "",
      error: "",
      waiting: true,
    });

    try {
      const response = await fetch(
        `/api/v1/users/self?fields=username,email,profile(name,phone)`,
        {
          headers: {
            "X-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        // Данные профиля загружены успешно
        this.setState(
          {
            ...this.getState(),
            username: json.result.username,
            name: json.result.profile.name,
            email: json.result.email,
            phone: json.result.profile.phone,
            waiting: false,
          },
          "Загружены данные профиля"
        );
      } else {
        this.setState(
          {
            ...this.getState(),
            username: "",
            email: "",
            name: "",
            phone: "",
            error: response.statusText,
            waiting: false,
          },
          "Ошибка при загрузке данных профиля"
        );
      }
    } catch (e) {
      console.log("Application error");
      this.setState({
        ...this.getState(),
        username: "",
        email: "",
        name: "",
        phone: "",
        error: "Application error",
        waiting: false,
      });
    }
  }
}

export default UserState;
