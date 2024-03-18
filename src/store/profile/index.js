import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    const token = localStorage.getItem('token');
    return {
      token: token? token : '',
      error: '',
      user: {}
    }
  }

  async login(login, password) {
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        'login': login,
        'password': password
      })
    });
    const json = await response.json();
    console.log(json);
    if(json.error){
      this.setState({
        ...this.getState(),
        error: json.error.message
      });
    }
    if(json.result){
      this.setState({
        ...this.getState(),
        token: json.result.token,
        error: '',
      });
      this.setUser(json.result.token);
      localStorage.setItem('token', json.result.token);
    }
  }

  async setUser(token) {
    const response = await fetch('/api/v1/users/self', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token' : token
      }
    });
    const json = await response.json();
    this.setState({
      ...this.getState(),
      user: json.result
    });
  }
}

export default ProfileState;