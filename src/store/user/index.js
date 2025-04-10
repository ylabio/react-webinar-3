import { deleteUser, getUser } from '../../api/http';
import StoreModule from '../module';
import { login } from '../../api/http';

class UserState extends StoreModule {
    initState() {
        return {
          user:{
            name: '',
            phohe: '',
            email: '',
          },
          isLogin: false,
        };
    }
    
    async initUser() {
      try{
        const response = await getUser()
        if(response === null) return
        if(response._id){
          this.setParams({
            user:{
              name: response.profile.name,
              phone: response.profile.phone,
              email: response.email,
            }, isLogin: true})
          }
        }catch(error){
          console.log(error.message)
        }
        }
      
    async resetUser(){
       try{
         await deleteUser()
         const userParams = {...this.initState()}
         await this.setParams(userParams)
        }catch(error){
          console.log(error)
        }
    }
    
    async setParams(newParams = {}) {
        const userParams = { ...this.getState(), ...newParams };
        this.setState(
          {
            ...this.getState(),
            user:{...userParams.user},
            isLogin: userParams.isLogin
          },
          'Установлены параметры авторизации',
        );
    }

    async logIn(data){
        const response = await login(data);
        if(response._id){
          this.setParams({user:{
            name: response.profile.name,
            phone: response.profile.phone,
            email: response.email,
          }, isLogin: true})
        }
    }

  }
export default UserState;