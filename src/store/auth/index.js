import StoreModule from "../module";


class AuthState extends StoreModule {

    initState(){
        return{
            profileInfo: {},
            token:'',
            error:''

        }
    }

    async checkAuth() {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
    }
    }

    async loadToken(token){

        this.setState({
            ...this.getState(),
            error:'',
            token:token
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
            if (json?.error?.message){
                this.setState({
                    ...this.getState(),
                    error:json.error.message
                })
            }
            else{   
                const responeProfile = await fetch('api/v1/users/self?fields=*',{
                    method: 'get',
                    headers:{
                        "X-token": `${json.result?.token}`,
                        "Content-Type": "application/json"
                    }
                })
                localStorage.setItem('token',JSON.stringify({token:json.result?.token}));
                this.setState({
                    ...this.getState(),
                    error:'',
                    token:json.result?.token,
                    profileInfo:await responeProfile.json()

                })
                
            }

        }catch(e){
            console.log(e);

        }
    }

    async exit(){
        // localStorage.clear();
        localStorage.removeItem('token')
        this.setState({
            ...this.getState(),
            token:null,
            error:'',
            profileInfo: {}
        })
    }

    async getProfile(){
        const token = JSON.parse(localStorage.getItem('token'))?.token;

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