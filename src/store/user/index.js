import StoreModule from "../module";

class User extends StoreModule {

  initState() {
    return {
      token: '',
      user: {},
      profile: {
        userName: '',
        phone: '',
        email: '',
      },
      errorMessage: '',
      waiting: false // признак ожидания загрузки
    }
  }

  async initUserProfile(token) {
    this.setState({
      profile: {},
      waiting: true
    });

    await fetch('api/v1/users/self?fields=*', {
      method: 'GET',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        const json = response.json();
        return json;
      })
      .then(data => {
        this.setState({
          profile: {
            userName: data.result.profile.name,
            phone: data.result.profile.phone,
            email: data.result.email,
          },
          waiting: false
        }, 'Данные пользователя получены');
      })
  }

  async auth(body, navigate) {
    this.setState({
      token: '',
      user: {},
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
            errorMessage: data.error.message,
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
            waiting: false
          }, 'Пользователь авторизован');

          localStorage.setItem('token', this.getState().token);
          navigate('/');
        }
      })
  }

  async signOut(token, navigate) {
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
      userName: '',
      profile: {
        userName: '',
        phone: '',
        email: '',
      },
      waiting: false
    }, 'Пользователь вышел из аккаунта');

    localStorage.setItem('token', '');
    if (navigate) navigate('/');
  }
}

export default User;
