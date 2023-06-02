import StoreModule from "../module";

class AuthState extends StoreModule {
  initState() {
    return {
      authFormData: {
        login: '',
        password: ''
      },
      isLoading: false,
      isError: false,
      isAuth: false
    }
  }

  setLogin(login) {
    this.setState({
      ...this.getState(),
      authFormData: {
        ...this.getState().authFormData,
        login,
      }
    })
  }

  setPassword(password) {
    this.setState({
      ...this.getState(),
      authFormData: {
        ...this.getState().authFormData,
        password,
      }
    })
  }

  async onLogin() {
    const login = this.getState().authFormData.login.trim(),
          password = this.getState().authFormData.password.trim();

    const params = {
      method: 'POST',
      body: JSON.stringify({login, password}),
      headers: { 'Content-Type': 'application/json' }
    }

    await fetch('/api/v1/users/sign', params)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        this.setState({
          ...this.getState(),
          authFormData: {
            login: '',
            password: ''
          },
          isError: data.error.data.issues[0].message,
        })

        return;
      }

      localStorage.setItem('token', data.result.token)

      this.getUser();
    })
    .catch(err => {
      throw new Error(err)
    })
  }

  onLogout() {
    localStorage.removeItem("token");

    this.setState({
      ...this.initState()
    })
  }

  async getUser() {
    const token = localStorage.getItem('token');

    if (token) {
      this.setState({
        ...this.getState(),
        isLoading: true,
      }, 'Загрузка пользователя')

      await fetch('/api/v1/users/self', {
        headers: { "X-Token": token },
      })
      .then(response => response.json())
      .then(data => {
        const name = data.result.profile.name ? data.result.profile.name : 'Не указано',
              phone = data.result.profile.phone ? data.result.profile.phone : 'Не указан',
              email = data.result.email ? data.result.email : 'Не указан';

        this.setState({
          userData: {
            name,
            phone,
            email
          },
          isLoading: false,
          isError: false,
          isAuth: true
        }, 'Данные пользователя загружены')
      })
    }
  }
}

export default AuthState;