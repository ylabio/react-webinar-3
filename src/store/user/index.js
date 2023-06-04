import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      user: {},
      token: '',
      waiting: false,
      error: null,
      isAuth: false,
    };
  }

  async login(credentials) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const { error, result } = await response.json();
      if (error) {
        const msg = error.data.issues[0].message;
        throw new Error(msg);
      }

      if (result) {
        this.setUser(result);
        localStorage.setItem('token', result.token);
      }
    } catch (err) {
      this.setState(
        {
          ...this.getState(),
          error: err.message,
          waiting: false,
        },
        'Ошибка при логине'
      );
    }
  }

  setUser({ user, token }) {
    const {
      email,
      _id,
      profile: { name, phone },
    } = user;

    this.setState(
      {
        ...this.getState(),
        error: null,
        isAuth: true,
        waiting: false,
        user: {
          email,
          _id,
          name,
          phone,
        },
        token,
      },
      'User data updated successfully'
    );
  }

  resetUser() {
    this.setState({
      user: {},
      token: '',
      waiting: false,
      error: null,
      isAuth: false,
    });
  }

  async logout() {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': this.getState().token,
        },
      });
      const { error } = await response.json();
      if (error) {
        throw new Error(error.data.issues[0].message);
      }

      this.resetUser();
      localStorage.removeItem('token');
    } catch (err) {
      console.log(err.message);
    }
  }

  getToken() {
    return this.getState().token || localStorage.getItem('token');
  }

  async checkUser() {
    const token = this.getToken();

    if (token) {
      this.setState({
        ...this.getState(),
        waiting: true,
      });
      const response = await fetch('/api/v1/users/self', {
        headers: { 'Content-Type': 'application/json', 'X-Token': token },
      });
      const { result } = await response.json();
      this.setUser({ user: result, token });
    }
  }
}

export default UserState;
