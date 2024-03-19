import StoreModule from "../module";

class ProfileState extends StoreModule {
  initState() {
    return {
      myProfile: {
        name: '',
        phone: '',
        email: ''
      },
      waiting: false,
      error: null
    };
  }

  async getMyProfile() {
    this.setState({ ...this.getState(), error: null, waiting: true });

    try {
      const token = localStorage.getItem('userToken');

      const response = await fetch('/api/v1/users/self?fields=email,profile(name,phone)', {
        method: 'GET',
        headers: { 'X-Token': token, 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      this.setState({
        ...this.getState(),
        myProfile: { ...data.result.profile, email: data.result.email },
        waiting: false,
      });
    } catch (error) {
      console.error('Ошибка получения профиля:', error);
      localStorage.removeItem('userToken');
      this.setState({
        ...this.initState()
      });
    }
  }
}

export default ProfileState;
