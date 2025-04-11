import StoreModule from '../module';

class ProfileState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
    };
  }

  async getUser() {
    console.log(this.getState());
    const response = await fetch('api/v1/users/self?fields=email,profile', {
      headers: {
        'X-Token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (response.status === 200) {
      const { email } = json.result;
      const { name, phone } = json.result.profile;

      this.setState(
        {
          ...this.getState(),
          user: { email, name, phone },
        },
        'Выход',
      );
    }
  }
}

export default ProfileState;
