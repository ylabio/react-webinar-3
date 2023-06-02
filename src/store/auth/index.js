import { deleteFromLocalStorage, getFromLocalStorage, setToLocalStorage } from "../../utils";
import StoreModule from "../module";

/**
 * Логика авторизации
 */
class ArticleState extends StoreModule {

  initState() {
    return {
      isAuth: false,
      error: null,
      userData: {},
      waiting: false
    }
  }

  async initAuth(){
      const token = getFromLocalStorage('token')

      if(token){
        this.setState({...this.getState(), isAuth: true, waiting: true})
        try{
          const headers = {
            'Content-Type': 'application/json',
            'X-Token': `${token}`
          };
  
          const response = await fetch('/api/v1/users/self', { headers })
          const json = await response.json();
          
          if(json.error){
            throw json.error
          } else {
            this.setState({
              ...this.getState, 
              userData: {email: json.result.email, ...json.result.profile}, 
              waiting: false, 
              isAuth: true, 
              error: null})
          }
        } catch(e){
          console.log(e)
          this.setState({...this.getState(), error: e.message, waiting: false})
        }
      } else {
        this.setState({...this.getState, waiting: false, isAuth: false, error: null})
      }
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
        throw json.error
      } else {
        setToLocalStorage('token', json.result.token)
        this.setState({
          ...this.getState, 
          userData: {email: json.result.user.email, ...json.result.user.profile}, 
          waiting: false, 
          isAuth: true, 
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

      const response = await fetch('/api/v1/users/sign', { headers, method: 'DELETE' })
      const json = await response.json();
      if(json.result) {
        deleteFromLocalStorage('token');
        this.setState({...this.initState()})
      } else {
        throw json.result;
      }
    } catch (e) {
      this.setState({...this.getState(), error: e.message, waiting: false})
    }
  }
}

export default ArticleState;
