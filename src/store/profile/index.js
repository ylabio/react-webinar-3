import StoreModule from "../module";

class Profile extends StoreModule {

  initState() {
    return {
      userName: '',
      phone: '',
      email: '',
      waiting: false
    }
  }

  async initUserProfile(token) {
    this.setState({
      userName: '',
      phone: '',
      email: '',
      waiting: true
    });

    await fetch('api/v1/users/self?fields=*', {
      method: 'GET',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        const json = response.json();
        return json;
      })
      .then(data => {
        this.setState({
          userName: data.result.profile.name,
          phone: data.result.profile.phone,
          email: data.result.email,
          waiting: false
        }, 'Данные пользователя получены');
      })
  }
}

export default Profile;
