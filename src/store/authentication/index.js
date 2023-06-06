import StoreModule from "../module";
  /**
      аутентификация
   */

class AuthenticationState extends StoreModule {
  initState() {
    return {
      user: '',
      token: localStorage.getItem('token'),
      waiting: true,
      isAuth: false,
      errorMessage: "",
    };
  }


  async signIn(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const res = await fetch("/api/v1/users/sign?fields=profile(name)", {
        method: "POST",
        body: JSON.stringify({
          login: login,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!data.error) {
        localStorage.setItem("token", data.result.token);

        this.setState({
          user: data.result.user.profile.name,
          token: data.result.token,
          errorMessage: "",
          waiting: false,
          isAuth: true,
        });
      } else {
        throw new Error(
          `Ошибка аутентификации: ${data.error.data.issues[0].message}`
        );
      }
    } catch (e) {
      console.error(e);
      this.setState({
        ...this.getState(),
        errorMessage: e.message,
        waiting: false,
        isAuth: false,
      });
    }
  }

  clearErrorMessage() {
    this.setState({
      ...this.getState(),
      errorMessage: ""
    });
  }

  async signOut() {
    this.setState({
      ...this.getState(),
      waiting: true
    })
    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        body: null,
        headers: {
            'Content-Type': 'application/json',
            'X-Token': `${this.getState().token}`
        }
      })

      localStorage.removeItem('token');
      this.setState({
        user: "",
        token: "",
        errorMessage: "",
        waiting: false,
        isAuth: false
      })
    } catch(e) {
      console.error(e);
      this.setState({
        ...this.getState(),
        waiting: false
      });
    }
  }

  async signInByToken() {
    try {
      this.setState({
        ...this.getState(),
        waiting: true
      });

      const res = await fetch('/api/v1/users/self?fields=profile(name)', {
        method: 'GET',
        body: null,
        headers: {
            'Content-Type': 'application/json',
            'X-Token': this.getState().token
        }
      })

      if(!res.ok) {
        throw new Error(`Неверный токен`);
      }

      const data = await res.json();

      console.log(data)

      this.setState({
        ...this.getState(),
        user: data.result.profile.name,
        errorMessage: "",
        waiting: false,
        isAuth: true
      });
    } catch(e) {
      this.setState({
        ...this.getState(),
        waiting: false
      });
      localStorage.removeItem('token');
    }
  }

}

export default AuthenticationState;
