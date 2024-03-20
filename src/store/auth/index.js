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

  async login(data) {
    try {
        this.setState({
					...this.getState(),
					waiting: true,
				});

        const response = await fetch(`/api/v1/users/sign`, {
					method: 'POST',
					body: JSON.stringify(data),
					headers: {'Content-Type': 'application/json'}
				});
				
				const json = await response.json();

				if (response.ok) {
					this.setState({
						...this.getState(),
						token: json.result.token,
						user: json.result.user,
						error: '',
						waiting: false });
	
					localStorage.setItem('token', json.result.token);
				} else {
					this.setState({
						...this.getState(),
						error: json.error.data.issues[0].message,
						waiting: false
					});
				}
    } catch (error) {
        console.error(error);
    }
  }

  async logout() {
    try {
        this.setState({
					...this.getState(),
					waiting: true,
					error: ''
				});

        await fetch('/api/v1/users/sign', {
            method: 'DELETE',
            headers: {
                'X-Token': this.getState().token,
                'Content-Type': 'application/json'
            }
        });

        this.setState({
					token: '',
					user: null,
					error: '',
					waiting: false
				});

        localStorage.removeItem('token');
    } catch (error) {
        console.error(error);
    }
  }

  async checkAuth() {
		const token = this.getState().token;

    if (!token) {
      return;
    }
		
    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();
			
      this.setState({ 
        ...this.getState(),
        user: json.result,
        error: '',
        waiting: false
			});
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthorizationState;