import StoreModule from "../module";


class AuthorizeState extends StoreModule {

  initState() {
    return {
      user: {},
      token: localStorage.getItem('token') || '',
      loggedIn: !!localStorage.getItem('token'),
      error: '',
      waiting: false,
    };
  }

  async signIn(credentials) {
    const {login, password} = credentials;
    this.setState({waiting: true, error: ''});

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'X-Token': this.getState().token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, password})
      });

      const data = await response.json();

      if (response.ok) {
        const {token} = data.result;
        localStorage.setItem('token', token);
        this.setState({
          token,
          loggedIn: true,
          waiting: false,
        });
      } else {
        this.setState({waiting: false, error: data.error.data.issues[0].message});
      }
    } catch (error) {
      this.setState({waiting: false, error: error.message});
    }
  }

  async signOut() {
    try {
      this.setState({...this.getState(), waiting: true, error: ''})
      await fetch('api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': this.getState().token,
          'Content-Type': 'application/json'
        }
      });
      this.setState({token: '', loggedIn: false, error: '', waiting: false, user: null});
      localStorage.removeItem('token');
    } catch (error) {
      this.setState({waiting: false, error: error.message});
    }
  }

  async fetchUser() {
    const token = this.getState().token
    if (token === '') return

    try {
      this.setState({...this.getState(), waiting: true});
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': this.getState().token,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      this.setState({...this.getState(), user: {...data.result}, waiting: false});
    } catch (error) {
      this.setState({waiting: false, error: error.message});
    }
  }

}

export default AuthorizeState;
