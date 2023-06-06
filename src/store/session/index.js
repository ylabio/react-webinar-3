import StoreModule from "../module";

/**
 * Информация о сессии
 */
class SessionStore extends StoreModule {
  initState() {
    return {
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      token: window.localStorage.getItem("token"),
      loggedIn: false,
      waiting: true,
    };
  }

  /**
   * Получение информации о пользователе
   */
  async getUserInfo() {
    const token = window.localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch("/api/v1/users/self", {
          headers: {
            "X-Token": token,
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        const item = json.result;

        // console.log(json)

        this.setState(
          {
            ...this.getState(),
            userInfo: {name: item.profile.name, phone: item.profile.phone, email: item.email},
            loggedIn: true,
            waiting: false,
            token: token,
          },
          "Получение информации о сессии"
        );
      } catch (error) {
        console.log(error);
        this.setState(
          {
            ...this.getState(),
            waiting: false
          },
          "Ошибка получения информации о сессии"
        );
        //window.localStorage.clear();
      }
    } else {
      this.setState(
        {
          userInfo: {
            name: "",
            phone: "",
            email: "",
          },
          error: "",
          waiting: false,
          loggedIn: false,
        },
        "Токен авторизации отсутствует, обнуление параметров пользователя"
      );
    }
  }

  /**
   * Завершение сессии
   */
  async removeUserInfo() {
    this.setState(
      {
        userInfo: {
          name: "",
          phone: "",
          email: "",
        },
        error: "",
        waiting: false,
        loggedIn: false,
      },
      "Завершение сессии"
    );
    window.localStorage.clear();
    // try {
    //   const response = await fetch("/api/v1/users/self", {
    //     method: "DELETE",
    //     headers: {
    //       "X-Token": window.localStorage.getItem("token"),
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const json = await response.json();
    //   console.log(json);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  /**
   * @param {boolean} logged 
   */
  setLoggedIn(logged) {
    this.setState(
      {
        ...this.getState(),
        loggedIn: logged,
      },
      "Установка флага авторизации"
    );
  }
}

export default SessionStore;
