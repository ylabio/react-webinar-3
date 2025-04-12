import StoreModule from '../module';

class UserState extends StoreModule {

  initState() {
    return {
      data: null,
      isAuth: false,
      error: null,
      token: null,
      isLoading: false,
    };
  }

  async login(login, password) {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.error?.data?.issues[0]?.message || 'Ошибка авторизации';

        throw new Error(errorMessage);
      }

      this.setState({isLoading: true})

      const json = await response.json();

      const { token, user } = json.result;

      localStorage.setItem('token', token);

      this.setState(
        {
          data: user,
          isAuth: true,
          error: null,
          token,
          isLoading: false,
        },
        'Успешная авторизация',
      );
    } catch (error) {
      this.setState(
        {
          data: null,
          isAuth: false,
          error: error.message,
          token: null,
          isLoading: false,
        },
        'Ошибка авторизации',
      );
    }
  }

  async logout() {
    try {

      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      });

      localStorage.removeItem('token');

      this.setState(
        {
          data: null,
          error: null,
          isAuth: false,
          token: null,
        },
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          data: null,
          error: error.message,
          isAuth: false,
          token: null,
        },
      );
    }
  }


  async getUserData(token) {
    try {
      this.setState({isLoading: true});
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      const data = json.result;

      this.setState(
        {
          data,
          error: null,
          isAuth: true,
          isLoading: false,
        },
      );
    } catch (error) {
      this.setState(
        {
          data: null,
          error: error.message,
          isAuth: false,
          isLoading: false,
        },
      );
    }
  }

  async checkAuth() {
    this.setState({ isLoading: true });

    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ token });
      await this.getUserData(token);
    } else {
      this.setState({ isAuth: false, data: null });
    }

    this.setState({
      ...this.getState(),
      isLoading: false });
  }

}

export default UserState;
