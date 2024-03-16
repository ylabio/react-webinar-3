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
    this.setState(this.initState());
    this.setState({
      ...this.getState(),
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
        //localStorage.setItem('token', json.result.token);
        console.log(json.result);
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
}

export default AuthrizationStore;