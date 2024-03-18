import StoreModule from "../module";

class LoginState extends StoreModule {

  initState() {
    const token = window.localStorage.getItem('token') || null
    const username = window.localStorage.getItem('username') || null
    
    return {
      isLoggedIn: token ? true : false,
      error: null,
      token: token,
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
        token: json.result.token,
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
    const token = this.getState().token
    
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
    }
  }
}

export default LoginState;
