import StoreModule from "../module";

class Session extends StoreModule {
  initState() {
    return {
      token: null,
      waiting: false,
      error: null,
    };
  }

  async login(login, password) {
    this.setState(
      { ...this.getState(), waiting: true, error: null },
      "Аутентификация..."
    );

    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (response.ok) {
        const json = await response.json();
        this.setState(
          {
            ...this.getState(),
            token: json.result.token,
            waiting: false,
            error: null,
          },
          "Аутентификация прошла успешно"
        );
        localStorage.setItem("token", json.result.token);
      } else {
        const json = await response.json();
        const errors = json.error.data.issues
          ?.map((error) => error.message)
          .join(", ");
        this.setState(
          { ...this.getState(), error: errors, waiting: false },
          "Аутентификация не прошла"
        );
      }
    } catch (e) {
      this.setState(
        {
          ...this.getState(),
          error: "Server is not available",
          waiting: false,
        },
        "Сервер недоступен"
      );
    }
  }

  async checkAuth() {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await fetch("/api/v1/users/self?fields=*", {
        headers: {
          "Content-Type": "application/json",
          "X-Token": `${token}`,
        },
      });

      if (response.ok) {
        this.setState({ token }, "Проверен и загружен токен..");
      } else {
        localStorage.removeItem("token");
      }
    }
  }

  async logout() {
    this.setState({ waiting: true }, "Выход...");
    try {
      await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": `${this.getState().token}`,
        },
      });
      localStorage.removeItem("token");
    } catch (e) {
      console.log(e);
    }
  }

  resetError() {
    this.setState({ ...this.getState(), error: null });
  }
}

export default Session;
