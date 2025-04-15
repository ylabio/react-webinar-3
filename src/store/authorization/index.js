import StoreModule from '../module';
import useStore from '../../hooks/use-store';

class AuthState extends StoreModule {
  initState() {
    return {
      userData: {},
      isLogin: false,
      error: '',
    };
  }

  async loginUser(data) {
    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log('result');
      console.log(result);

      if (result.result) {
        localStorage.setItem('token', result.result.token);
        this.setState({
          ...this.getState(),
          userData: result.result.user,
          isLogin: true,
          error: '',
        }, 'Успешный loginUser');
      } else {
        this.setState({
          ...this.getState(),
          userData: {},
          isLogin: false,
          error: result.error.data?.issues[0]?.message || result.error.data?.message,
        }, 'Ошибка loginUser');
      }
    } catch (error) {
      console.error(this.getState());
    }
  }

  async logoutUser() {
    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token'),
        },
      });

      // console.log('res logout---');
      // console.log(res);

      localStorage.removeItem('token');
      this.setState(
        {
          ...this.getState(),
          userData: {},
          isLogin: false,
          error: '',
        },
        'Выход из аккаунта logoutUser',
      );
    } catch (error) {
      console.error(this.getState());
    }
  }

  async checkUser() {
    if (localStorage.getItem('token')) {
    try {
      const res = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token'),
        },
      });

      const result = await res.json();
      console.log('result check---');
      console.log(result);

      if (result.result) {
        this.setState({
          ...this.getState(),
          userData: result.result,
          isLogin: true,
          error: '',
        }, 'Успешный checkUser');
      } else {
        localStorage.removeItem('token');
        this.setState({
          ...this.getState(),
          userData: {},
          isLogin: false,
          error: '',
        }, 'Ошибка checkUser');
      }
    } catch (error) {
      console.error(this.getState());
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
    this.setState({...this.getState(), error: ''})
  }
}

export default AuthState;
