import StoreModule from "../module";
class User extends StoreModule {
  initState() {
    return {
      user: "",
      user_profile: "",
      token: "",
      eror: false,
      auth: false,
    };
  }

  getUserInformatin() {
    return this.getState();
  }
  setUserInformation(props) {
    // console.log(props);
    return this.setState(
      {
        ...this.getState(),
        ...props,
      },
      "Установлены параметры "
    );
  }

  async getUser(login, password) {
    let user = {
      login: login,
      password: password,
    };
    try {
      let response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        let result = await response.json();
        this.setUserInformation({ ...result.result, eror: false, auth: true });
      } else {
        console.log(response);
        this.setUserInformation({ eror: response.statusText, auth: false });
      }
    } catch (e) {
      console.log(e);
    }

    // console.log(this.getState());
  }

  async deleteUser() {
    try {
      let response = await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "X-Token": this.getState().token,
        },
      });
      if (response.ok) {
        this.setUserInformation(this.initState());
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getUserProfile() {
    try {
      let response = await fetch(
        "/api/v1/users/self?fields=username,profile(phone),email",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "X-Token": this.getState().token,
          },
        }
      );

      if (response.ok) {
        let result = await response.json();
        this.setUserInformation({ user_profile: result.result });
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default User;
