import StoreModule from "../module";

class SessionState extends StoreModule {
  initState() {
    return {
      waiting: false,
      errors: [],
      userName: "",
    };
  }

  initUserFromStorage() {
    const userName = localStorage.getItem("userName") || "";
    this.setState({
      ...this.getState(),
      userName,
    });
  }

  async signIn(authInfo, callbackBySuccess) {
    try {
      this.setState({
        waiting: true,
      });

      const data = {
        login: authInfo.login,
        password: authInfo.password,
      };

      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      console.log("login json.result", json.result);

      if (!response.ok) {
        throw json.error.data.issues; // Handle error
      } else {
        localStorage.setItem("userToken", json.result.token);
        localStorage.setItem("userName", json.result.user.profile.name);

        callbackBySuccess();

        this.setState(
          {
            data: json.result.user,
            waiting: false,
          },
          "Профиль загружен из API"
        );
      }
    } catch (e) {
      this.setState({
        waiting: false,
        errors: e,
      });
    }
  }

  async signOut() {
    const token = localStorage.getItem("userToken");

    try {
      this.setState({
        waiting: true,
      });

      await fetch(`/api/v1/users/sign`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });

      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");

      this.setState({
        data: null,
      });
    } catch (error) {
      console.error("Ошибка при выходе из системы:", error);
    } finally {
      this.setState({
        waiting: false,
        userName: "",
      });
    }
  }

  resetError() {
    if (this.getState().errors.length) {
      this.setState({
        errors: [],
      });
    }
  }
}

export default SessionState;
