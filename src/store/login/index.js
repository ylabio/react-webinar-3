import StoreModule from "../module";


class Login extends StoreModule{


    initState(){
        return{
            token: JSON.parse(localStorage.getItem('token'))?.token,
            exception:'',
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
                console.log(json)
                this.setState({
                    ...this.getState(),
                    exception:json.error.data.issues[0].message
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
                    exception:'',
                    token:json.result?.token,
                    
                })
            }

        }catch(e){
            console.log(e);
            
        }
    }

    async exit(){
        localStorage.clear();
        const response = await fetch('api/v1/users/self?fields=*',{
            method: 'delete',
            headers:{
                "X-token": `${this.getState().token}`,
                "Content-Type": "application/json"
            }
        })
        this.setState({
            ...this.getState(),
            token:null,
            exception:'',
        })
    }

    clearException(){
        this.setState({
            ...this.getState(),
            exception:'',
        })
    }

}

export default Login;