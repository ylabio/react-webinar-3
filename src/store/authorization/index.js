import StoreModule from "../module";

class AuthorizationState extends StoreModule {

  initState() {
    return {
      userName: localStorage.getItem('userName') || '',
      token: localStorage.getItem('token') || null,
      waiting: false,
      errorMessage: ''
    }
  }

  async signIn(data) {
    this.setState({
        ...this.getState(),
        waiting: true,
        errorMessage: ''
      });

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
          waiting: false
        });
      } 

      this.setState({
        ...this.getState(),
        userName: json.result.user.profile.name,
        token: json.result.token,
        waiting: false,
      });
        window.localStorage.setItem('token', json.result.token); 
        window.localStorage.setItem('userName', json.result.user.profile.name); 
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
      window.localStorage.removeItem('userName'); 


    } catch (e) {
      console.error(e);
    }
    this.setState({...this.initState()});
  }
}

export default AuthorizationState;

