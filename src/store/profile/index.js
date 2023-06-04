import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      profile: {},
      waiting: false,
      error: null,
    };
  }

  async getProfile(id = '') {
    this.setState({
      ...this.getState(),
      profile: {},
      error: null,
      waiting: true,
    });
    const token = this.store.actions.user.getToken();
    try {
      const response = await fetch(`/api/v1/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });
      const { error, result } = await response.json();
      if (error) {
        const msg = error.message;
        throw new Error(msg);
      }

      if (result) {
        const { profile, email, _id } = result;
        this.setProfile({ ...profile, email, _id });
      }
    } catch (err) {
      this.setState(
        {
          ...this.getState(),
          error: err.message,
          waiting: false,
        },
        'Profile loading error'
      );
    }
  }

  setProfile(profile) {
    this.setState(
      {
        ...this.getState(),
        error: null,
        waiting: false,
        profile,
      },
      'Profile info updated successfully'
    );
  }

  resetProfile() {
    this.setProfile({});
  }
}

export default ProfileState;
