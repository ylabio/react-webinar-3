import StoreModule from "../module";

class AuthorizationState extends StoreModule {

  initState() {
    return {
      userName: '',
      token: localStorage.getItem('token') || null,
      errorMessage: ''
    }
  }

  async signIn(data) {
    this.clearErrors()

    try {
      const response = await fetch('/api/v1/users/sign',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      const json = await response.json();

      if (json.error) {
        this.setState({
          ...this.getState(),
          errorMessage: json.error.data.issues[0].message,
        });
      } 

      this.setState({
        ...this.getState(),
        userName: json.result.user.profile.name,
        token: json.result.token,
      });
      
        window.localStorage.setItem('token', json.result.token); 
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

    } catch (e) {
      console.error(e);
    }
    this.setState({...this.initState()});
  }

  async checkAuth(token) {
    try {
      const response = await fetch('/api/v1/users/self?fields=profile',
      {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });
      
      const json = await response.json();
      if (json.error) {
        window.localStorage.removeItem('token');
        this.setState({...this.initState()});
      } else {
        this.setState({
          ...this.getState(),
          userName: json.result.profile.name,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  clearErrors() {
    this.setState({
      ...this.getState(),
      errorMessage: '',
    });
  }
}

export default AuthorizationState;

