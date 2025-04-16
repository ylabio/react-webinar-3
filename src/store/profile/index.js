import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      data: null,
      loading: false,
      errors: null
    };
  }

  /**
   * Загрузка данных профиля
   */
  async loadProfile() {
    this.setState({ ...this.getState(), loading: true, errors: null });

    try {
      const token = this.getState().token;
      const response = await fetch('/api/v1/profile', {
        headers: { 'X-Token': token }
      });
      const json = await response.json();

      if (json.error) throw new Error(json.error.message);

      this.setState({
        ...this.getState(),
        data: json.result,
        loading: false
      });

    } catch (error) {
      this.setState({
        ...this.getState(),
        errors: error.message,
        loading: false
      });
    }
  }

  /**
   * Обновление профиля
   */
  async updateProfile(newData) {
    this.setState({ ...this.getState(), loading: true });

    try {
      const token = this.getState().token;
      const response = await fetch('/api/v1/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token
        },
        body: JSON.stringify(newData)
      });
      const json = await response.json();

      if (json.error) throw new Error(json.error.message);

      this.setState({
        ...this.getState(),
        data: { ...this.getState().data, ...newData },
        loading: false
      });

      return true;
    } catch (error) {
      this.setState({
        ...this.getState(),
        errors: error.message,
        loading: false
      });
      return false;
    }
  }
}

export default ProfileState;
