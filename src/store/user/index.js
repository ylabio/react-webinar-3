import StoreModule from '../module';

class UserState extends StoreModule {
    initState() {
        return {
          user:{
            name: '',
            phohe: '',
            email: '',
          },
        };
    }
    
    async getUser(authData) {
      this.setParams(authData)   
    }
      
    async resetUser(){
      const userParams = {...this.initState()}
      await this.setParams(userParams)
    }
    
    async setParams(newParams = {}) {
        const userParams = { ...this.getState(), ...newParams };
        this.setState(
          {
            ...this.getState(),
            user:{...userParams.user},
          },
          'Установлены параметры авторизации',
        );
    }

  }
export default UserState;