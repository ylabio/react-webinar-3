import StoreModule from "../module";


class ProfileState extends StoreModule {

  initState() {
    return {
      profileInfo: {}
    }
  }

    async checkProfile(_id) {
    let token = localStorage.getItem("token")
    const response = await fetch(`/api/v1/users/${_id}`,{
        method: 'get',
        headers:{
            "accept": "application/json",
            "X-token": `${token}`
        }
        }).then(result => result.json())
    this.setState({
      ...this.getState(),
        profileInfo: response,
    }, 'Обновление профиля');
  }
}

export default ProfileState;
