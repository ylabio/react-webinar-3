import StoreModule from "../module";


class Profile extends StoreModule{

    initState() {
        return {
            profileInfo: {},
        }
      }

      async getProfile(){

        const response = await fetch('api/v1/users/self?fields=*',{
            method: 'get',
            headers:{
                "X-token": `${JSON.parse(localStorage.getItem('token'))?.token}`,
                "Content-Type": "application/json"
            }
        })
        
        this.setState({
            ...this.getState(),
            profileInfo: await response.json()
        })
    }

}

export default Profile;