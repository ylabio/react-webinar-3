import StoreModule from "../module";

class Profiles extends StoreModule{
    initState() {
        return {
        proile:'',
        profiles:[],
        waiting:false,
        };
      }
      setProfiles(props) {
        return this.setState(
          {
            ...this.getState(),
            ...props,
          },
          "Установлены параметры "
        );
      }

      async getProfile(token) {
        this.setProfiles({waiting:true})
        try {
          let response = await fetch(
            "/api/v1/users/self?fields=username,profile(phone,name),email",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                "X-Token": token,
              },
            }
          );
    
          if (response.ok) {
            let result = await response.json();
            this.setProfiles({ profile: result.result, waiting:false});
          }
        } catch (e) {
          console.log(e);
        }
}
}

export default Profiles;