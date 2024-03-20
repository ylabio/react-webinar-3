import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class AuthState extends StoreModule {
  initState() {
    return {
      token: localStorage.getItem("token") || "",
      username: "",
      waiting: false,
      error: "",
    };
  }

  async login(dataAuth) {
    try {
      this.setState({
        waiting: true,
        error: "",
      });
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataAuth),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error.data.issues[0].message;
        throw new Error(errorMessage);
      }

      this.setState({
        token: data.result.token,
        username: data.result.user,
        waiting: false,
      });
      localStorage.setItem("token", data.result.token);
    } catch (e) {
      console.error(e);
      this.setState({ error: e.message, waiting: false });
    }
  }

  async logout() {
    try {
      this.setState({
        waiting: true,
        error: "",
      });
      await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "X-Token": this.getState().token,
          "Content-Type": "application/json",
        },
      });

      this.setState({
        token: "",
        username: "",
        waiting: false,
      });
      localStorage.removeItem("token");
    } catch (e) {
      console.error(e);
      this.setState({ waiting: false });
    }
  }

  async checkAuth() {
    try {
      const token = this.getState().token;

      if (!token) {
        return;
      }

      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      this.setState({
        ...this.getState(),
        username: data.result,
        error: "",
        waiting: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message, waiting: false });
    }
  }
  clearError() {
    this.setState({ error: "" });
  }
}

export default AuthState;
