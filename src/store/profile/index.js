import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      userInfo: null,
      waiting: false
    }
  }

  async getUserInfo() {
    const token = localStorage.getItem('token')

    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Получение данных пользователя');

    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': `${token}`
        }
      });

      const json = await response.json();

      if (response.ok) {
        const userInfo = json.result

        this.setState({
          ...this.getState(),
          userInfo: userInfo,
          waiting: false,
        }, 'Загружены данные пользователя из АПИ');
      }

      if (!response.ok) {
        this.setState({
          ...this.getState(),
          userInfo: null,
          waiting: false
        });
      }
    } catch (err) {
      this.setState({
        userInfo: null,
        waiting: false
      }, 'Ошибка получения данных пользователя из АПИ');
    }
  }

  async clearUserInfo() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Удаление данных пользователя');

    try {
      this.setState({
        ...this.getState(),
        userInfo: null,
        waiting: false,
      }, 'Удалены данные пользователя из АПИ');
    } catch (err) {
      this.setState({
        ...this.getState(),
        waiting: false
      }, 'Ошибка удаления данных пользователя из АПИ');
    }
  }
}

export default UserState;
