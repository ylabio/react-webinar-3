import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      data: {
        token: localStorage.getItem('user') || '',
        name: '',
        phone: '',
        email: ''
      },
      waiting: false,
      error: null
    }
  }

  async getMe() {
    if (!this.getState().data.token) {
      console.log('Токен не найден. Необходимо авторизоваться.')
      return
    }

      this.setState({
        ...this.getState(),
        waiting: true,
      }, 'Запрашиваю данные пользователя')

      const res = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'X-Token': this.getState().data.token}
      })
      const json = await res.json()

      if (json.result) {
        this.setState({
          ...this.getState(),
          data: {
            ...this.getState().data,
            name: json.result.profile.name,
            phone: json.result.profile.phone,
            email: json.result.email
          },
          waiting: false
        }, 'Данные пользователя успешно получены')
      } else {
        this.setState({
          ...this.getState(),
          waiting: false,
          error: json.error.data.issues
        }, 'Ошибка получения данных пользователя')
      }
  }

  async authorize(login, pass) {

    const user = {
      login,
      password: pass
    }

    this.setState({
      ...this.getState(),
      waiting: true,
    }, 'Отправка данных авторизации начата')

    const res = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
    const json = await res.json()

    if (json.error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: json.error.data.issues
      }, 'Ошибка авторизации')
    } else {
      this.setState({
        ...this.getState(),
        data: {
          token: json.result.token,
          name: json.result.user.profile.name,
          phone: json.result.user.profile.phone,
          email: json.result.user.email
        },
        waiting: false,
        error: null,
      }, 'Успешная авторизация')

      localStorage.setItem('user', this.getState().data.token)
    }
  }

  async logout() {

    this.setState({
      ...this.getState(),
      waiting: true,
    }, 'Отправка токена для разлогина начата')

    const res = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', 'X-Token': this.getState().data.token}
    })
    const json = await res.json()

    if (json.result) {
      localStorage.removeItem('user')

      this.setState({
        ...this.initState(),
      }, 'Успешно разлогинен')
    } else {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: json.error.data.issues
      }, 'Ошибка разлогина')
    }
  }


}

export default UserState;