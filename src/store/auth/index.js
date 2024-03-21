import StoreModule from "../module";


class AuthState extends StoreModule {

    initState(){
        return{
            profileInfo: {},
            token:localStorage.getItem('token'),
            error:''

        }
    }

    async checkAuth() {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
    }
    }

    clearError(){
        this.setState({
            ...this.getState(),
            error:''
        })
    }

    async loadToken(token){

        this.setState({
            ...this.getState(),
            error:'',
            token:this.getState().token
        })
    }

    async login({login,password}) {

        try{
            const response = await fetch('/api/v1/users/sign',{
            method: 'post',
            body: JSON.stringify({"login":login,"password":password}),
            headers:{
                "Content-Type": "application/json"
            }
            })



            const json = await response.json();
            if (json?.error){
                this.setState({
                    ...this.getState(),
                    error:json.error
                })
            }
            else{   
                const responeProfile = await fetch('api/v1/users/self?fields=*',{
                    method: 'get',
                    headers:{
                        "X-token": `${json.result.token}`,
                        "Content-Type": "application/json"
                    }
                })
                this.setState({
                    ...this.getState(),
                    error:'',
                    token:json.result.token,
                    profileInfo:await responeProfile.json()

                })
                localStorage.setItem('token',this.getState().token);
                
            }

        }catch(e){
            console.log(e);

        }
    }

    async exit(){
        // localStorage.clear();
        const token = localStorage.getItem('token');
        try {
          await fetch(`/api/v1/users/sign`, {
            method: 'DELETE',
            headers:  {
              'Content-Type': 'application/json',
              'X-Token': token
            }
        })

        localStorage.removeItem('token')
        this.setState({
            ...this.getState(),
            token:null,
            error:'',
            profileInfo: {}
        })
        } catch (e) {
            this.setState({
            waiting: false,
            error: e
            });
      }
    }

    async getProfile(){
        const token = localStorage.getItem('token');

        const response = await fetch('api/v1/users/self?fields=*',{
            method: 'get',
            headers:{
                "X-token": `${token}`,
                "Content-Type": "application/json"
            }
        })

        this.setState({
            ...this.getState(),
            profileInfo:await response.json()
        })




    }
}

export default AuthState;