import { deleteFromLocalStorage, getFromLocalStorage, setToLocalStorage } from "../../utils";
import StoreModule from "../module";

/**
 * Логика авторизации
 */
class AuthState extends StoreModule {

  initState() {
    this.setState({...this.getState(), 
      isAuth: false,
      error: null,
      userData: {},
      waiting: false}
    )
  }
  
  async login(body) {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const response = await fetch('/api/v1/users/sign', { method: 'POST', headers, body: JSON.stringify(body)})
      const json = await response.json();

      if(json.error){
        throw json.error.data.issues[0]
      } else {
        setToLocalStorage('token', json.result.token)
        this.setState({
          ...this.getState, 
          waiting: false, 
          error: null})
      }

    } catch (e) {
      this.setState({...this.getState(), error: e.message, waiting: false})
      
    }
  }

  async logout() {
    
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const token = getFromLocalStorage('token')
      const headers = {
        'Content-Type': 'application/json',
        'X-Token': `${token}`
      };

      deleteFromLocalStorage('token');

      const response = await fetch('/api/v1/users/sign', { headers, method: 'DELETE' })
      const json = await response.json();
      if(json.result) {
        this.setState({...this.initState(), waiting: false})
      } else {
        throw json.result;
      }
    } catch (e) {
      this.setState({...this.getState(), error: e.message, waiting: false})
    }
  }
}

export default AuthState;
