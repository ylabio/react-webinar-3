import StoreModule from "../module";


class AuthorizationState extends StoreModule {

  initState() {
    return {
      user: null,
      token: '',
      error: '',
      waiting: false,
      session: false
    }
  }

  async signIn(data) {
    this.setState(this.initState());
    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const json = await res.json();

      if (!json.error){
        this.setState({
          ...this.getState(),
          token: json.result.token,
          user: json.result.user,
          session: true,
          waiting: false,
          error: ''
        });

        window.localStorage.setItem('token', json.result.token);

      } else {
        this.setState({
          ...this.getState(),
          error: json.error.data.issues[0].message,
          waiting: false
        });
      }
    } catch (e) {
      console.error(e);
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
      window.localStorage.removeItem('token');
    } catch (error) {
      console.error(error);
    }
    this.setState({...this.initState(), waiting: false});
  }

  async checkAuthorization() {
    const token = localStorage.getItem('token');
    if (token) {
      const res = await fetch('/api/v1/users/self', {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token
        },
      });
      const json = await res.json();
      if (json.error) {
        window.localStorage.removeItem('token');
        this.setState({
          ...this.getState(), session: false, waiting: false
        });
      } else {
        this.setState({
          ...this.getState(),token: token, user: json.result, session: true, waiting: false, error: ''
        });
      }
    } else {
      this.setState({
        ...this.getState(), session: false, waiting: false
      });
    }
  }
}

export default AuthorizationState;