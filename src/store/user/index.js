import StoreModule from "../module";

class UserState extends StoreModule {
  initState() {
    return {
      isAuthorized: false,
      user: {},
    };
  }

  async userLogOut() {
    const token = window.localStorage.getItem("token");
    await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: 
      { "Content-Type": "application/json",
      "X-Token": token,
    },
    }).then((res) => {
      if(res.ok) {
        localStorage.removeItem("token");
        this.setState({
          isAuthorized: false,
          user: {},
        });
        return
      }
      throw new Error("Something went wrong");
    })
    .catch((error) => {
      console.log(error);
    });
  }

  async userLogin({ login, password }) {
    await fetch("/api/v1/users/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Wrong data");
    })
    .then((data) => {
      window.localStorage.setItem("token", data.result.token);
      this.getUserInfo();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  async getUserInfo() {
    const token = window.localStorage.getItem("token");
    if (token != null) {
      await fetch("/api/v1/users/self", {
        headers: { "X-Token": token },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Not valid token");
        })
        .then((data) => {
          this.setState({
            isAuthorized: true,
            user: data.result,
          });
        })
        .catch((error) => {
          this.setState({
            isAuthorized: false,
            user: {},
          });
          console.log(error);
        });
    }
  }
}

export default UserState;
