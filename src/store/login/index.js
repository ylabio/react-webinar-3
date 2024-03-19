import { getCurrentToken } from "../../utils";
import StoreModule from "../module";

class LoginState extends StoreModule {

  initState() {
    const token = getCurrentToken()
    const username = window.localStorage.getItem('username')
    
    return {
      isLoggedIn: token ? true : false,
      error: null,
      username: username
    }
  }

  async signIn(data) {
    const formData = {
      login: data.get('login'),
      password: data.get('password'),
    };

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }) 

      if (!response.ok) {
        this.setState({
          ...this.initState(),
          error: response.statusText
        })
        throw new Error(`request failed with status ${response.status}`)
      }
      
      const json = await response.json()
      
      this.setState({
        isLoggedIn: true,
        username: json.result.user.username,
        error: null,
      })

      window.localStorage.setItem('token', json.result.token)
      window.localStorage.setItem('username', json.result.user.username)
    } catch(err) {
      console.error('Fetch error', err) 
    }
  }

  async logOut(){
    const token = getCurrentToken();
    
    if(!token) {
      this.setState({
        ...this.initState()
      })
      return;
    }
    
    try {
      
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      }) 
      
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('username')

      this.setState({
        ...this.initState(),
      })

    } catch(err) {
      console.error('Fetch error', err) 
      this.setState({
        ...this.initState(),
      })
    }
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null,
    })
  }

  async validateToken(token) {
    try {
      const response = await fetch(`/api/v1/users/self?fields=status`, {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        }
      });
  
      const json = await response.json();
      if(json.result.status !== 'confirm') this.logOut()
    } catch (error) {
      console.error(error)
      this.logOut()
    }
  }
}

export default LoginState;
