import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    const token = localStorage.getItem('token');

    return {
      token: token || null,
      user: {},
      loading: false,
      error: null,
      isAuth: false,
    };
  }

  async fetchUser(token) {
    try {
      this.setState({ ...this.getState(), loading: true, error: null });
  
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });
  
      const json = await response.json();
      this.setState({ ...this.getState(), user: json.result, loading: false, isAuth: true  });
  
    } catch (error) {
      this.setState({ ...this.getState(), error: error.message, loading: false, isAuth: false });
    }
  }

  async loginUser({ login, pass }) {
  const response = await fetch('/api/v1/users/sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password: pass }),
  });

  const json = await response.json();

  const errorMessage = json.error?.data?.issues?.[0]?.message || json.error?.message || 'Ошибка входа';
  
  if (!response.ok) {
    this.setState({ 
      ...this.getState(), 
      error: errorMessage,
      isAuth: false,
    });
    return { error: errorMessage };
  }

  const { token, user } = json.result;
  localStorage.setItem('token', token);

  this.setState({
    ...this.getState(),
    token,
    user,
    error: null,
    isAuth: true,
  }, 'Вход в аккаунт');

  return { success: true };
}

async logoutUser() {
  try {
    const { token } = this.getState();
    
    const response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json',
      },
    });

    localStorage.removeItem('token');
    this.setState(
      {
        ...this.getState(),
        token: '',
        user: {},
        error: null,
        isAuth: false,
      },
      'Выход из аккаунта',
    );

  } catch (error) {
    console.error('Error:', error);
    this.setState({
      ...this.getState(),
      error: error.message,
    });
  }
}

  async initUser() {
    const { token } = this.getState();
    if (token) {
      await this.fetchUser(token);
    }
  }
}

export default UserState;
