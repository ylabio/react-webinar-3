import StoreModule from "../module";
import { getCookie } from "../../cookie";

class ProfileState extends StoreModule {

  initState() {
    return {
      user: null,
      waiting: false,
    }
  }

  async fetchUser(id) {
    const accessToken = getCookie("token");
    this.setState({
      user: null,
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/${id}`, {
        method: 'GET',
        headers: {
          'X-Token': accessToken,
          'Content-Type': 'application/json'
        }
      });
      if (response && response.ok) {
        const json = await response.json();
        this.setState({
          user: json.result,
          waiting: false,
        }, 'Данные о пользователе получены');
      } else if (response) {
        const json = await response.json();
        this.setState({
          ...this.getState(),
          waiting: false,
        }, `Не удалось получить данные о пользователе: ${json.error.code}: ${json.error.message}`);
      }
    } catch (e) {
      this.setState({
        user: null,
        waiting: false,
      }, "Не удалось получить данные с сервера");
    }
  }

  clearUser() {
    this.setState({
      user: null,
      waiting: false,
    }, "Данные о пользователе очищены");
  }
}

export default ProfileState;