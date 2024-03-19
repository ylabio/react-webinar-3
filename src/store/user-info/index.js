import StoreModule from "../module";

class UserInfoState extends StoreModule {
    initState(){
        return {
            email: '',
            profile: {},
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
            email: data.result.email,
            profile: data.result.profile
        })
      }
    clearUser(){
        this.setState({
            ...this.getState(),
            email: '',
            profile: {}
        })
    }
}

export default UserInfoState