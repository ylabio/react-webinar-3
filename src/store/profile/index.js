import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    return {   
      userData: {},
      waiting: false,
      error: null
    }
  }

  async getUser() {   
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
                }, 'Получение данных пользователя');

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
            waiting: false          
        });
    }   
  }
}

export default ProfileState;
