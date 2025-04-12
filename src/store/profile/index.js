import StoreModule from '../module';

class Profile extends StoreModule {
    initState() {
      return {
        data: null,
        loading: false,
        error: null
      };
    }
  
    async loadProfile(token) {
      if (!token) return;
  
      try {
        this.setState({ ...this.getState(), loading: true });
  
        const response = await fetch('/api/v1/users/self?fields=*', {
          headers: {
            'X-Token': token,
            'Content-Type': 'application/json'
          }
        });
  
        const { result } = await response.json();
        this.setState({ 
          data: result,
          loading: false
        });
      } catch (error) {
        this.setState({
          error: error.message,
          loading: false
        });
      }
    }
  }

export default Profile;
