import StoreModule from "../module";

class ProfileState extends StoreModule {
  initState() {
    return {
      user: undefined,
      isLoading: true,
      loggedIn: false
    };
  }

  /**
   * Получение данных пользователя
   * @return {Promise<void>}
   */
  async getUser() {
    const token = window.localStorage.getItem("token");
    let userData = undefined;
    if (token) {
      this.setState({
        ...this.getState(),
        isLoading: true,
      });
      const userResponse = await fetch('/api/v1/users/self', {
        headers: { "X-Token": token, "content-type": "application/json" },
      });
      const {result: user} = await userResponse.json();
      userData = {user};
      this.setState({
        ...this.getState(),
        loggedIn: true
      });
    }
    this.setState({
      ...this.getState(),
      ...userData,
      isLoading: false,
    },
      'Получены данные пользователя');
  }
}

export default ProfileState;