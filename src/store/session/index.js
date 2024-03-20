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
          { ...this.getState(), token: json.result.token, waiting: false },
          "Аутентификация прошла успешно"
        );
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
    } catch (e) {
      console.log(e);
    }
  }
}

export default Session;
