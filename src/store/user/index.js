import StoreModule from "../module";

/**
 * Детальная ифнормация о пользователе для страницы пользователя
 */
class UserState extends StoreModule {

  initState() {
    return {
      user: {},
      error: '',
      token: JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '',
      waiting: false // признак ожидания загрузки
    }
  }

  async login(form) {
    const response = fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    if(!(await response).ok) {
      response
        .then(data => data.json())
        .then(data => {
          this.setState({
            ...this.getState(),
            error: data.error.message
          })
        })
      return
    }

    response
      .then(data => data.json())
      .then(data => {
        localStorage.setItem('token', JSON.stringify(data.result.token))

        this.setState({
          ...this.getState(),
          token: data.result.token,
          error: '',
          user: data.result.user
        })
      })
  }

  async logout() {
    const response = fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token
          ? this.getState().token
          : JSON.parse(localStorage.getItem('token'))
      },
    })

    if(!(await response).ok) {
      response
        .then(data => data.json())
        .then(data => {
          this.setState({
            ...this.getState(),
            error: data.error.message
          })
        })
      return
    }

    // response
    //   .then(data => data.json())
    //   .then(data => {
        localStorage.removeItem('token')

        this.setState({
          ...this.getState(),
          token: '',
          error: '',
          user: {}
        })
      // })
  }

  async check() {
    this.setState({
      ...this.getState(),
      waiting: true
    })

    const response = fetch('/api/v1/users/self', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token
          ? this.getState().token
          : JSON.parse(localStorage.getItem('token'))
      },
    })

    if(!(await response).ok) {
      response
        .then(data => data.json())
        .then(data => {
          this.setState({
            ...this.getState(),
            error: data.error.message,
            waiting: false
          })
        })
      return
    }

    response
      .then(data => data.json())
      .then(data => {
        this.setState({
          ...this.getState(),
          user: data.result,
          waiting: false,
          error: ''
        })
      })
  }
}

export default UserState;
