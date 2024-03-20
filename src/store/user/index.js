import StoreModule from "../module";
class User extends StoreModule {
  initState() {
    return {
      user: "",
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
         let result = await response.json();
      if (response.ok) {
        localStorage.setItem('token',result.result.token);
        this.setUserInformation({ ...result.result, eror: false, auth: true });
      } else {
   
        this.setUserInformation({ eror: result.error.data.issues, auth: false });
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
    localStorage.removeItem('token')
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getUserToken(token) {
    try {
      let response = await fetch(
        "/api/v1/users/self?fields=username,profile(phone,name),email",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "X-Token": token,
          },
        }
      );

      if (response.ok) {
        let result = await response.json();
        this.setUserInformation({ user: result.result, auth:true, token:token });
      }
    } catch (e) {
      console.log(e);
    }
  }


}

export default User;
