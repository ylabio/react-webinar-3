import StoreModule from '../module';

class SessionState extends StoreModule {
  initState() {
    const token = localStorage.getItem('authToken');
    return {
      user: null,
      token: token || null,
      waiting: false,
      error: null
    };
  }

  async signIn({ login, password }) {
    this.setState({ waiting: true, error: null });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error?.message || 'Auth failed');

      localStorage.setItem('authToken', data.result.token);

      this.setState({
        user: data.result.user,
        token: data.result.token,
        waiting: false
      });

      return true;
    } catch (error) {
      this.setState({ waiting: false, error: error.message });
      return false;
    }
  }

  async signOut() {
    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': this.getState().token
        }
      });

      localStorage.removeItem('authToken');

      this.setState({ user: null, token: null });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async checkAuth() {
    const { token } = this.getState();
    if (!token) return false;

    try {
      const response = await fetch('/api/v1/users/self', {
        headers: { 'X-Token': token }
      });

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      const data = await response.json();

      this.setState({
        user: data.result,
        token: token
      });

      return true;
    } catch (error) {
      localStorage.removeItem('authToken');
      this.setState({
        token: null,
        user: null
      });
      return false;
    }
  }
}

export default SessionState;
