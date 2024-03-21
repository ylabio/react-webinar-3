import StoreModule from "../module";

class AuthActionState extends StoreModule {
  initState() {
    return {
      token: localStorage.getItem("token") || null,
      user: null,
      error: "",
      waiting: false,
    };
  }
  componentDidMount() {
    this.setState({
      error: null,
    });
  }
  async handleLogin(data) {
    try {
      this.setState({
        waiting: true,
        error: "",

      });

      const response = await fetch(`/api/v1/users/sign`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if (response.ok) {
        this.setState({
          token: json.result.token,
          user: json.result.user,
          error: {
            message: "",
          },
          waiting: false,
        });

        localStorage.setItem("token", json.result.token);
      } else {
        this.setState({
          error: {
            message: json.error.message || "Unknown error occurred",
          },
          waiting: false,
        });
      }
    } catch (error) {
      console.error(error);
      this.setState({
        error: {
          message: "An error occurred while processing your request",
        },
        waiting: false,
      });
    }
  }

  async handleLogout() {
    try {
      this.setState({
        ...this.getState(),
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
        user: null,
        error: "",
        waiting: false,
      });

      localStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    }
  }

  async handleAuth() {
    const token = this.getState().token;

    if (!token) {
      return;
    }

    try {
      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      this.setState({
        ...this.getState(),
        user: json.result,
        error: "",
        waiting: false,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthActionState;
