import { gatherErrorMessages, getCurrentToken } from "../../utils";
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
        const errorData = await response.json()
        const errorMessage = gatherErrorMessages(errorData.error)
        
        this.setState({
          ...this.initState(),
          error: errorMessage
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
    } catch(error) {
      console.error('Fetch error', error) 
    }
  }

  async logOut(error = null){
    const token = getCurrentToken();
    
    if(!token) {
      this.setState({
        ...this.initState(),
        error
      })
      window.localStorage.clear()
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
      
      window.localStorage.clear()

      this.setState({
        ...this.initState(),
        error
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
    const username = window.localStorage.getItem('username')
    
    try {
      const response = await fetch(`/api/v1/users/self?fields=status,username`, {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        }
      });
  
      const json = await response.json();
      if(json.result.status !== 'confirm') {
        this.logOut()
        return false
      }

      if(username !== json.result.username) {
        window.localStorage.setItem('username', json.result.username)
        this.setState({...this.getState(), username: json.result.username})
      }

      return true
    } catch (error) {
      console.error(error)
      this.logOut()
    }
  }
}

export default LoginState;
