import StoreModule from "../module";

/**
 * Информация о пользователе
 */
class UserInfo extends StoreModule {
  initState() {
    return {
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      error: "",
    };
  }

  /**
   * Авторизация
   * @param [userData] {Object} логин и пароль
   */
  async login(userData) {
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const json = await response.json();
      const item = json;

      if (!item.error) {
        this.store.actions.session.setLoggedIn(true);
        this.setState(
          {
            ...this.getState(),
            userInfo: {
              name: item.result.user.profile.name,
              phone: item.result.user.profile.phone,
              email: item.result.user.email,
            },
            error: "",
          },
          "Авторизация пользователя"
        );
        window.localStorage.setItem("token", item.result.token);
      } else {
        const errorsArray = item.error.data.issues.map(issue => issue.message);
        const errorMessage = errorsArray.join(", ");
        this.setState(
          {
            ...this.getState(),
            error: errorMessage,
          },
          "Получена ошибка авторизации"
        );
        //window.localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Завершение сессии
   */
  async logout() {
    this.setState(
      {
        userInfo: {
          name: "",
          phone: "",
          email: "",
        },
        error: "",
      },
      "Удаление информации о пользователе из store"
    );
  }

  /**
   * Сброс ошибок авторизации
   */
  async resetErrors() {
    this.setState(
      {
        ...this.getState(),
        error: "",
      },
      "Сброс ошибок авторизации"
    );
  }
}

export default UserInfo;
