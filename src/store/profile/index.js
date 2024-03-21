import StoreModule from "../module";


class Profile extends StoreModule{

    initState() {
        return {
            profileInfo: {},
        }
      }

      async getProfile(){
        try{
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
        }catch(e){
            console.error(e);
        }
        
    }

}

export default Profile;