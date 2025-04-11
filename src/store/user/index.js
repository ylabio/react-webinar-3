import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    const token = localStorage.getItem('token');

    return {
      token: token || '',
      user: {},
      loading: false,
      error: null,
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
      this.setState({ ...this.getState(), user: json.result, loading: false });
  
    } catch (error) {
      this.setState({ ...this.getState(), error: error.message, loading: false });
    }
  }

  async loginUser({ login, pass }) {
  const response = await fetch('/api/v1/users/sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password: pass }),
  });

  const json = await response.json();
  
  if (!response.ok) {
    this.setState({ 
      ...this.getState(), 
      error: json.error?.message || 'error login '
    });
    return { error: json.error?.message };
  }

  const { token, user } = json.result;
  localStorage.setItem('token', token);

  this.setState({
    ...this.getState(),
    token,
    user,
    error: null
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
