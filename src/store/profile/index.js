import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    return {
      data: {
        id: '',
        name: '',
        phone: '',
        email: '',
      },
      waiting: false,
      error: null
    }
  }

  async getUserProfile(id, authUserToken) {

    this.setState({
      ...this.getState(),
      waiting: true,
    }, 'Запрашиваю искомый профиль пользователя')

    const res = await fetch(`/api/v1/users/${id}?fields=*`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'X-Token': authUserToken }
    })
    const json = await res.json()

    if (json.result) {
      this.setState({
        ...this.getState(),
        data: {
          ...this.getState().data,
          id: json.result._id,
          name: json.result.profile.name,
          email: json.result.email,
          phone: json.result.profile.phone,
        },
        waiting: false,
      }, 'Данные профиля успешно загружены')
    } else {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: json.error.data.issues
      }, 'Ошибка получения данных профиля')
    }
  }
}

export default ProfileState;