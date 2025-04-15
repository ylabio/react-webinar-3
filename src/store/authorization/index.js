import StoreModule from '../module';
import useStore from '../../hooks/use-store';

class AuthState extends StoreModule {
  initState() {
    return {
      userData: {},
      isLogin: false,
      error: '',
      isLoading: false,
    };
  }

  async loginUser(data) {
    try {
      // this.setState({...this.getState(), isLoading: true});

      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.result) {
        localStorage.setItem('token', result.result.token);
        this.setState({
          ...this.getState(),
          userData: result.result.user,
          isLogin: true,
          error: '',
          isLoading: false,
        }, 'Успешный loginUser');
      } else {
        this.setState({
          ...this.getState(),
          userData: {},
          isLogin: false,
          error: result.error.data?.issues[0]?.message || result.error.data?.message,
          isLoading: false,
        }, 'Ошибка loginUser');
      }

    } catch (error) {
      console.error('Ошибка авторизации');
    }
  }

  async logoutUser() {
    try {
      this.setState({...this.getState(), isLoading: true});
      const res = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token'),
        },
      });

      localStorage.removeItem('token');
      this.setState(
        {
          ...this.getState(),
          userData: {},
          isLogin: false,
          error: '',
          isLoading: false
        },
        'Выход из аккаунта logoutUser',
      );
    } catch (error) {
      console.error('Ошибка авторизации');
    }
  }

  async checkUser() {
    if (localStorage.getItem('token')) {
    try {
      this.setState({...this.getState(), isLoading: true});
      const res = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token'),
        },
      });

      const result = await res.json();

      if (result.result) {
        this.setState({
          ...this.getState(),
          userData: result.result,
          isLogin: true,
          error: '',
          isLoading: false
        }, 'Успешный checkUser');
      } else {
        localStorage.removeItem('token');
        this.setState({
          ...this.getState(),
          userData: {},
          isLogin: false,
          error: '',
          isLoading: false
        }, 'Ошибка checkUser');
      }
    } catch (error) {
      console.error('Ошибка авторизации');
    }} else {
      this.setState({
        ...this.getState(),
        userData: {},
        isLogin: false,
        error: '',
      }, 'Токен отсутсвует checkUser');
    }
  }

  clearError() {
    this.setState({...this.getState(), error: ''}, 'Очистка ошибок при возврате на Главную');
  }
}

export default AuthState;
