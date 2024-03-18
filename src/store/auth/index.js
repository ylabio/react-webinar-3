import StoreModule from "../module";

class AuthState extends StoreModule {
  initState() {
    return {
      user: null,
      token: '',
      error: '',
      pending: false,
      isLoggedIn: false
    };
  }

  async signIn(data) {
    this.setState({ ...this.initState(), pending: true });

    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const json = await res.json();

      if (!res.ok) {
        const errorMessage = json.error.message;

        this.setState({
          error: errorMessage,
          pending: false
        });

        return
      }

      const { token, user } = json.result;
      localStorage.setItem('token', token);
      this.setState({
        token,
        user: user.profile,
        isLoggedIn: true,
        pending: false,
        error: ''
      });

    } catch (error) {
      console.error('Error signing in:', error);
    }
  }

  async signOut() {
    const { token } = this.getState()

    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token
        }
      });

      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error signing out:', error);
    }
    this.setState(this.initState());
  }

  async auth() {
    const token = localStorage.getItem('token');
    if (!token) return

    try {
      const res = await fetch('/api/v1/users/self', {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token
        },
      });

      const json = await res.json();

      if (json.error) {
        localStorage.removeItem('token');
      } else {
        const { profile } = json.result;
        this.setState({
          token,
          user: profile,
          isLoggedIn: true,
          pending: false,
          error: ''
        });
      }
    } catch (error) {
      console.error('Error while authorization:', error);
    }
  }

}

export default AuthState;
