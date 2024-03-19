import StoreModule from '../module';

class AuthrizationStore extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: '',
      token: localStorage.getItem('token') || null,
      isAuthorized: false,
      waiting: false,
      error: false,
      errorMessage: ''
    }
  }

  async signIn(data) {
    this.setState({
      ...this.initState(),
      waiting: true
    }, 'Отправили данные пользователя');

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if (!json.error) {
        this.setState({
          ...this.getState(),
          user: json.result.user,
          token: json.result.token,
          isAuthorized: true,
          waiting: false,
          error: false
        });
        localStorage.setItem('token', json.result.token);
      } else {
        this.setState({
          waiting: false,
          error: true,
          errorMessage: json.error.data.issues[0].message
        })
      }
    } catch (err) {
      console.log(err);
      this.setState({
        waiting: false,
      })
    }
  }

  async signOut() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Отправили запрос на выход пользователя');

    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'X-Token': localStorage.getItem('token')
        }
      });
      localStorage.removeItem('token');
    } catch (err) {
      console.log(err);
    }

    this.setState({
      ...this.initState(),
      waiting: false
    })
  }

  async checkAuthorization() {
    const token = localStorage.getItem('token');

    if (token) {
      this.setState({
        ...this.getState(),
        waiting: true,
      });


      const response = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'X-Token': localStorage.getItem('token')
        }
      });

      const json = await response.json();
      if (!json.error) {
        this.setState({
          ...this.getState(),
          token: token,
          user: json.result,
          isAuthorized: true,
          waiting: false,
          error: false
        });
      } else {
        this.setState({
          ...this.getState(),
          isAuthorized: false,
          waiting: false,
          error: true
        })
      }
    } else {
      this.initState();
    }
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: false,
      errorMessage: ''
    })
  }
}

export default AuthrizationStore;