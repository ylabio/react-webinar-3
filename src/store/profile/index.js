import StoreModule from "../module";

class ProfileState extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      profile: {},
      token: localStorage.getItem('token') || '',
      isAuth: !!localStorage.getItem('token'),
      waiting: false,
      error: ''
    }
  }

  async setProfile() {
    // Начальные данные
    this.setState({
      ...this.getState(),
      waiting: true
    });
    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-token': this.getState().token
        },
      });
      const json = await response.json();
      console.log(json)
      if (response.ok) {
        this.setState({
          ...this.getState(),
          profile: json.result,
          waiting: false,
          isAuth: true,
          error: ''
        }, 'Получены данные пользователя')
      } else {
        this.setState({
          ...this.getState(),
          isAuth: false,
          profile: {},
          waiting: false
        }, 'Ошибка авторизации')
      }

    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message
      })
    }

  }
}

export default ProfileState;