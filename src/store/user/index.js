import StoreModule from "../module";

class User extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: null,
      error: "",
      waiting: false,
      authFetchCompleted: false,
    };
  }

  async signIn(newUser) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(
        "/api/v1/users/sign?fields=_id,profile(name)",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.data.issues[0].message);
      }
      this.setState({
        ...this.getState(),
        data: data.result.user,
        error: "",
        waiting: false,
      });

      localStorage.setItem("token", data.result.token);
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
        waiting: false,
        data: null,
      });
    }
  }

  async authMe() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({
        ...this.getState(),
        authFetchCompleted: true,
      });
      return;
    }
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      let response = await fetch(
        `/api/v1//users/self?fields=_id,profile(name)`,
        {
          method: "GET",
          headers: {
            "X-Token": token,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.data.issues[0].message);
      }
      this.setState({
        ...this.getState(),
        data: data.result,
        error: "",
        waiting: false,
        authFetchCompleted: true,
      });
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
        waiting: false,
        data: null,
        authFetchCompleted: true,
      });
    }
  }

  async signOut() {
    const token = localStorage.getItem("token");
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    if (!token) return;
    try {
      let response = await fetch(`/api/v1//users/sign`, {
        method: "DELETE",
        headers: {
          "X-Token": token,
        },
      });
      console.log("out");
      const data = await response.json();
      if (data.result && response.ok) {
        this.setState({
          ...this.getState(),
          data: null,
          error: "",
          waiting: false,
        });
        localStorage.removeItem("token");
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error,
        waiting: false,
        data: null,
      });
    }
  }
  resetError() {
    this.setState({
      ...this.getState(),
      error: "",
    });
  }
}

export default User;
