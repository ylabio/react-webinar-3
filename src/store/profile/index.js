import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    return {
      token: '',
      error: '',
    }
  }

  async login(login, password) {
    console.log(login);
    console.log(password);
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
        error: ''
      })
      alert(`Добро пожаловать ${json.result.user.profile.name} ${json.result.user.profile.surname}`);
    }
  }
}

export default ProfileState;