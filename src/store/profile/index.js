import StoreModule from '../module';
import api from '../../api';

class ProfileStore extends StoreModule {
  initState() {
    return {
      profile: null,
      loading: false,
      error: null,
    };
  }

  setLoading(loading) {
    this.setState({
      ...this.getState(),
      loading,
    });
  }

  setError(error) {
    this.setState({
      ...this.getState(),
      error: Array.isArray(error) ? error : [error],
    });
  }

  async loadProfile(token) {
    this.setLoading(true);
    try {
      const user = await api.getProfile(token);
      this.setState({
        profile: user,
        error: null,
        loading: false,
      });
    } catch (error) {
      this.setError(['Ошибка загрузки профиля']);
      this.setState({ loading: false });
    }
  }

  clearProfile() {
    this.setState(this.initState());
  }
}

export default ProfileStore;
