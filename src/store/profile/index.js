import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    return {
      profileInfo: {
        name: "",
        phone: "",
        email: ""
      },
      waiting: false 
    }
  }

  tokenChecking() {
    const isInStorage = Boolean(localStorage.getItem("token"))

    this.setState({
      ...this.getState(),
      profileInfo: {
        ...this.getState().profileInfo,
        name: localStorage.getItem("name")
      }
    });

    return isInStorage

  }


  async getProfileInfo() {

    this.setState({
      ...this.getState(),
      waiting: true
    });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "X-Token": token
        },
      });
      const json = await response.json();

      console.log(json)

      if (json.error) {
        throw new Error(json.error.message)
      }

      this.setState({
        ...this.getState(),
        profileInfo: {
          name: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email
        },
        waiting: false
      });

      return true

    } catch (e) {

      localStorage.removeItem("name");
      localStorage.removeItem("token");

      console.log(e.message)
      this.setState({
        ...this.getState(),
        waiting: false
      });

      return false

    }

  }

}




export default ProfileState;