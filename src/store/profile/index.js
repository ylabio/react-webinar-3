import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    return {
      userData: {
        name: '',
        email: '',
        phone: '',
      },
      errorMessage: '',
      waiting: false,
    }
  }

  async getProfileByToken() {
    const token = JSON.parse(localStorage.getItem("XToken"));

    const response = await fetch(`/api/v1/users/self?fields=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", "X-Token": token,
      },
    });

    const json = await response.json();

    if (response.ok) {

      this.setState({
        ...this.getState(),

        userData: {
          name: json.result.profile?.name,
          email: json.result.email,
          phone: json.result.profile?.phone,
        },
        waiting: false,
      }, 'Логин по Токену');
    }else{
      console.log('getProfileByToken errorMessage: ', json.error?.data.issues[0].message,)
    }
  }

}

export default ProfileState;
