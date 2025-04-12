import StoreModule from '../module';
import { redirect } from 'react-router-dom';

class AuthState extends StoreModule {
  initState() {
    return {
      name: null,
      isLogin: false,
    };
  }

    async initAuth(authData) {
        this.setParams(authData)
    }
        
      async resetUser(){
         try{
           await deleteUser()
           const userParams = {...this.initState()}
           await this.setParams(userParams)
          }catch(error){
            console.error('Не удалось разлогиниться', error)
          }
      }
      
      async setParams(newParams = {}) {
          const userParams = { ...this.getState(), ...newParams };
          console.log(userParams)
          this.setState(
            {
              ...this.getState(),
              name:userParams.name,
              isLogin: userParams.isLogin
            },
            'Установлены параметры авторизации',
          );
      }
  
}

export default AuthState;

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    return match ? decodeURIComponent(match[2]) : null
  }
  
export async function login (data) {
    const response = await fetch('api/v1/users/sign', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({login: `${data.login}`, password: `${data.password}`,})
        
        })

    const json = await response.json()
    if(json.error){
        const issues = json.error.data.issues.map(issue=> (issue.message))
        throw new Error(JSON.stringify({issues}))
    }
    console.log(json)
    return json.result.user;
}

export async function  getUser () {
    const token = getCookie('token');
    if(!token){
        return null;
    }
    const response = await fetch('api/v1/users/self?&fields=*', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'X-Token' : `${token}`
            
        },
        
    })
    const json = await response.json();
    if(json.error){
        const issues = json.error.data.issues.map(issue=> (issue.message))
        console.log(issues)
        throw new Error(JSON.stringify({issues}))
    }
    return  json.result
}

export async function deleteUser () {
    const token = getCookie('token');
    if(!token){
        console.log('fdsfsdfs')
        return 
    }
    const response = await fetch('api/v1/users/sign', {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'X-Token' : `${token}`
            
        },
        
    })
    if(!response.ok){
        throw new Error('Не удалось разлогиниться')
    }else{
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        redirect('/')
    }
}
