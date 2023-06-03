import StoreModule from "../module";

class ProfileState extends StoreModule {
  initState() {
    return {
      userData: null,
      isLoading: false,
      isError: false,
      isAuth: false
    }
  }

  async getUser() {
    const token = localStorage.getItem('token');

    if (token) {
      this.setState({
        ...this.getState(),
        isLoading: true,
      }, 'Загрузка пользователя')

      await fetch('/api/v1/users/self', {
        headers: { "X-Token": token },
      })
      .then(response => response.json())
      .then(data => {
        const name = data.result.profile.name ? data.result.profile.name : 'Не указано',
              phone = data.result.profile.phone ? data.result.profile.phone : 'Не указан',
              email = data.result.email ? data.result.email : 'Не указан';

        this.setState({
          userData: {
            name,
            phone,
            email
          },
          isLoading: false,
          isError: false,
          isAuth: true
        }, 'Данные пользователя загружены')
      })
      .catch((err) => {
        this.setState({
            isLoading: false,
            isError: true,
            isAuth: false
          }, 'Ошибка загрузки пользователя')

        throw new Error(err)
      })
    }
  }

  onLogout() {
    localStorage.removeItem("token");

    this.setState({
      ...this.initState()
    })
  }
}

export default ProfileState;
