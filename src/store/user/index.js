import StoreModule from "../module";

class User extends StoreModule {

  initState() {
    return {
      token: localStorage.getItem('token') || '',
      user: {},
      profile: {
        userName: localStorage.getItem('userName') || '',
      },
      errorMessage: '',
      waiting: false // признак ожидания загрузки
    }
  }

  async auth(body, navigate) {
    this.setState({
      token: '',
      user: {},
      profile: {
        userName: '',
      },
      errorMessage: '',
      waiting: true
    });

    await fetch('api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        const json = response.json();
        return json;
      })
      .then(data => {
        if (data.error) {
          this.setState({
            token: '',
            user: {},
            profile: {
              userName: '',
            },
            errorMessage: data.error.data.issues[0].message,
            waiting: false
          });
        } else {
          // Пользователь авторизован
          this.setState({
            token: data.result.token,
            user: data.result.user,
            profile: {
              userName: data.result.user.profile.name,
            },
            errorMessage: '',
            waiting: false
          }, 'Пользователь авторизован');

          localStorage.setItem('token', this.getState().token);
          localStorage.setItem('userName', this.getState().profile.userName)
          navigate('/', {replace: true});
        }
      })
  }

  async signOut(token) {
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json'
      }
    })

    this.setState({
      token: '',
      user: {},
      profile: {
        userName: '',
      },
      errorMessage: '',
      waiting: false
    }, 'Пользователь вышел из аккаунта');

    localStorage.setItem('token', '');
    localStorage.setItem('userName', '')
  }
}

export default User;
