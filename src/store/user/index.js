import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      isAuth: false,
      userData: {},
      waiting: false,
      error: null
    }
  }

  async login(data) {   
    this.setState({
        ...this.getState(),      
        waiting: true
    });

    try {
        const response = await fetch(`/api/v1/users/sign`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }); 
        
        const json = await response.json();       

        if (response.ok) {       
                      
            localStorage.setItem('token', json.result.token);   

            this.setState({
                ...this.getState(),
                userData: {
                    name: json.result.user.profile.name,
                    phone: json.result.user.profile.phone,
                    email: json.result.user.email,
                },            
                isAuth: true,
            }, 'Авторизация');          
        } else {           
            this.setState({
                ...this.getState(),
                error: json.error.data.issues[0].message,        
            });
        }

    } catch (error) {
        this.setState({
            ...this.getState(),
            error: error.data.issues[0].message,        
        });
    } finally {
        this.setState({   
            ...this.getState(),         
            waiting: false,
        });
    }
  }

  async authorizationСheck() {   
    this.setState({
        ...this.getState(),
        error: null,
        waiting: true
    });    

    try {
        if(localStorage.getItem('token')) {

            const response = await fetch(`/api/v1/users/self`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Token': localStorage.getItem('token')
                }              
            }); 
            
            const json = await response.json();  

            if (response.ok) {

                this.setState({
                    ...this.getState(),
                    userData: {
                        name: json.result.profile.name,
                        phone: json.result.profile.phone,
                        email: json.result.email,
                    },            
                    isAuth: true,
                }, 'Авторизация по токену');

            }
        }         
        
    } catch (error) {
        this.setState({
            ...this.getState(),
            error: error.data.issues[0].message,        
        });
    } finally {
        this.setState({   
            ...this.getState(),         
            waiting: false,
        });
    }   
  }

  async logout() {
    this.setState({
        ...this.getState(),      
        waiting: true
    });    

    try {
        const response = await fetch(`/api/v1/users/sign`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': localStorage.getItem('token')
            }          
        });    
        
        if (response.ok) {
        
            localStorage.removeItem('token');  

            this.setState({
                ...this.getState(),
                userData: { },            
                isAuth: false,
            }, 'Отмена авторизации');    
        
        }
        
    } catch (error) {
        this.setState({
            ...this.getState(),
            error: error.data.issues[0].message,        
        });
    } finally {
        this.setState({   
            ...this.getState(),         
            waiting: false,
        });
    }
  }

  async resetError() {
    this.setState({
        ...this.getState(),      
        error: null
    });    
  }
}

export default UserState;
