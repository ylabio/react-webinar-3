import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      name: '',
      phone: '',
      email: '',
      waiting: true,
    };
  }

  async getUser() {
    const token = this.store.getState().session.token || localStorage.getItem('token');
    this.setState({
      waiiting: true,
    });
    try {
      const res = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error.message);
      }

      const json = await res.json();

      this.setState({
        name: json.result.profile.name,
        phone: json.result.profile.phone,
        email: json.result.email,
        token: token,
        waiting: false,
      });
    } catch (e) {
      this.setState({
        waiting: false,
      });
      console.error(e);
    }
  }
}

export default UserState;
