import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class AuthState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      error: "",
      userName: "",
      isAuth: false,
    };
  }
  
  clear(){
    this.setState(
      {
        ...this.getState(),
        error: '',
      },
      "Очищаем стейт"
    );
  }

  async loginByUsername(data) {
    const authData = {
      login: data.login,
      password: data.password,
      remember: true,
    };

    const response = await fetch("/api/v1/users/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(authData),
    });
    const json = await response.json();
    if (response.ok) {
      localStorage.setItem("token", json.result.token);
      this.setState(
        {
          ...this.getState(),
          userName: json.result.user.username,
          isAuth: true,
        },
        "Загружены данные сессии"
      );
    } else {
      if (json?.error?.message) {
        this.setState(
          {
            ...this.getState(),
            error:
              json.error.message + ": " + json.error?.data?.issues[0]?.message,
              isAuth: false,
          },
          "Загружена ошибка"
        );
      }
    }
  }

  async loginByToken() {
    const token = window.localStorage.getItem("token");
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Грузим данные"
    );
    if (token) {
      const response = await fetch("/api/v1/users/self", {
        headers: { "X-Token": token, "content-type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        this.setState(
          {
            ...this.getState(),
            waiting: false,
            userName: json.result.username,
            isAuth: true,
          },
          "Загрузили данные"
        );
        return;
      } else {
        this.setState(
          {
            ...this.getState(),
            waiting: false,
            isAuth: false,
          },
          "Загрузили данные"
        );
      }
    }
    this.setState(
      {
        ...this.getState(),
        waiting: false,
        isAuth: false,
      },
      "Загрузили данные"
    );
  }

  async logOut() {
    const token = localStorage.getItem("token");
    await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: { "X-Token": token },
    });

    window.localStorage.removeItem("token");
    this.setState(
      {
        ...this.getState(),
        isAuth: false,
        username: null,
        waiting: false,
      },
      "Пользователь вышел из системы"
    );
  }

}

export default AuthState;
