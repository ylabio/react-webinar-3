import StoreModule from "../module";

class UserState extends StoreModule {
  initState() {
    return {
      userData: null,
      waiting: false,
      errorMessage: "",
    };
  }

  async initUser() {
    const authToken = localStorage.getItem("token");

    if (!authToken) return;

    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-token": authToken,
        },
      });
      const { result, error } = await response.json();

      if (error) {
        throw new Error(error.message);
      }

      if (result) {
        this.setState(
          {
            ...this.getState(),
            userData: result,
            waiting: false,
          },
          "Получены данные пользователя"
        );
      }
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          errorMessage: error.message,
          waiting: false,
        },
        "Ошибка при получении данных пользователя"
      );

      setTimeout(() => {
        this.setState({
          ...this.getState(),
          errorMessage: "",
        });
      }, 3_500);
    }
  }

  async authUser(authData) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(authData),
      });

      const json = await response.json();

      if (json.error) {
        throw new Error(
          json.error.data.issues[0].message || json.error.message
        );
      }

      if (json.result) {
        localStorage.setItem("token", json.result.token);

        this.setState({
          ...this.getState(),
          userData: json.result.user,
          waiting: false,
        });
      }
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          errorMessage: error.message,
          waiting: false,
        },
        "Ошибка при авторизации пользователя"
      );

      setTimeout(() => {
        this.setState({
          ...this.getState(),
          errorMessage: "",
        });
      }, 3_500);
    }
  }

  async logout() {
    const authToken = localStorage.getItem("token");

    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "X-token": authToken,
        },
      });

      localStorage.removeItem("token");

      this.setState({
        ...this.getState(),
        userData: null,
        waiting: false,
      });
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          errorMessage: error.message,
          waiting: false,
        },
        "Ошибка при при попытке выхода"
      );

      setTimeout(() => {
        this.setState({
          ...this.getState(),
          errorMessage: "",
        });
      }, 3_500);
    }
  }
}

export default UserState;
