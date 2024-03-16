import StoreModule from "../module";

class AuthorizationState extends StoreModule {
  initState() {
    return {
      token: localStorage.getItem('token') || '',
      user: null,
      waiting: false,
      error: ''
    };
  }

  async login(loginData) {    
    try {
        this.setState({ waiting: true, error: '' }); 
        
        const response = await fetch('/api/v1/users/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.error?.data?.issues[0]?.message || errorData?.error?.message );
        }

        const data = await response.json();
        
        this.setState({ 
          ...this.getState(), 
          user: data.result.user, 
          token: data.result.token, 
          error: '', 
          waiting: false }, 'Авторизация пользователя'); 
        localStorage.setItem('token', data.result.token);
    } catch (error) {
        console.error('Login error:', error);        
        this.setState({ error: error.message, waiting: false });
    }
  }

  async logout() {
    try {
        this.setState({ ...this.getState(), waiting: true, error: '' });
        await fetch('/api/v1/users/sign', {
            method: 'DELETE',
            headers: {
                'X-Token': this.getState().token,
                'Content-Type': 'application/json'
            }
        });
        this.setState({ token: '', user: null, error: '', waiting: false });
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Logout error:', error);
        this.setState({ waiting: false });
    }
  }

  async fetchProfile() {
    try {
      const token = this.getState().token;        
      
      if (!token) {        
        return;
      }  
      
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      this.setState({ 
        ...this.getState(), 
        user: data.result, 
        error: '', 
        waiting: false }, 'Повторная авторизация'); 
    } catch (error) {
      console.error('Fetch profile error:', error);
      this.setState({ error: error.message, waiting: false });
    }
  }
}

export default AuthorizationState;
