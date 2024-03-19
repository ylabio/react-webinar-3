import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
        token: localStorage.getItem("X-Token") ?? "",
        user: {},
        error: ""
      };
  }
  
  async authorization(login, password){
    const credentials = {
        "login": login,
        "password": password
    }
    const response = await fetch('/api/v1/users/sign', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    const data = await response.json()
    if(response.status == 200){
        const token = data.result.token
        const user = data.result.user
        this.setState({
            ...this.getState(),
            token,
            user,
            error: ''
        })
        localStorage.setItem("X-Token", token)
        return true
    } else{
        console.error(data.error.data.issues[0].message);
        this.setState({
            ...this.getState(),
            error: data.error.data.issues[0].message
        })
    }
  }

  async getUserInfo(token){
    const response = await fetch('/api/v1/users/self?fields=*', {
        method: "GET",
        headers: {
            'X-Token': token,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    this.setState({
        ...this.getState(),
        user: data.result
    })
  }

  async logOut(){
    await fetch('/api/v1/users/sign', {
        method: "DELETE",
        headers: {
            'X-Token': this.getState().token,
            'Content-Type': 'application/json'
        } 
    })
    localStorage.removeItem("X-Token")
    this.setState({
        ...this.getState(),
        token: '',
        user: {},
        error: ''
    })
  }

  removeError(){
    this.setState({
        ...this.getState(),
        error: ''
    })
  }
}

export default UserState;