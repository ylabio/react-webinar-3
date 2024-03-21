import StoreModule from "../module";


class Login extends StoreModule{


    initState(){
        return{
            token: JSON.parse(localStorage.getItem('token'))?.token,
            exception:undefined,
            isAuth:JSON.parse(localStorage.getItem('token'))?.token ? true : false,
            waiting:false,
            navigateLink: '/'
        }
    }

    changeNavLink(){
        this.setState({
            ...this.getState(),
            navigateLink:localStorage.getItem('page')
        })
    }


    async recoverySession(){
        try{
            this.setState({
                ...this.getState(),
                waiting:true
            })
            const response = await fetch('api/v1/users/self?fields=*',{
                method: 'get',
                headers:{
                    "X-token": `${this.getState().token}`,
                    "Content-Type": "application/json"
                }
            })
            const json = await response.json();
            if (json?.error){
                this.setState({
                    ...this.getState(),
                    token:null,
                    isAuth:false,
                    waiting:false
                })
            }
            else{
                this.setState({
                    ...this.getState(),
                    isAuth:true,
                    waiting:false
                })
            }
        }catch(e){
            console.error(e);
        }

        
    }
    

    async login(login,password) {
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
                    exception:json.error.data.issues[0].message,
                    
                })
                
            }
            else{   
                const responseProfile = await fetch('api/v1/users/self?fields=*',{
                    method: 'get',
                    headers:{
                        "X-token": `${json.result?.token}`,
                        "Content-Type": "application/json"
                    }
                })
                
                localStorage.setItem('token',JSON.stringify({token:json.result?.token}));
                this.setState({
                    ...this.getState(),
                    exception:undefined,
                    token:json.result?.token,
                    isAuth:true
                    
                })
                
            }

        }catch(e){
            console.error(e);
            
        }
    }

    async exit(){
        localStorage.removeItem('token');
        const response = await fetch('/api/v1/users/sign',{
            method: 'delete',
            headers:{
                "X-token": `${this.getState().token}`,
                "Content-Type": "application/json"
            }
        })
        this.setState({
            ...this.getState(),
            token:null,
            exception:undefined,
            isAuth:false
        })
    }

    clearException(){
        this.setState({
            ...this.getState(),
            exception:undefined,
        })
    }

}

export default Login;