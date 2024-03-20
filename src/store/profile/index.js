import { deleteCookie, getCookie } from "../../utils";
import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    return {
      data: {},
      error: null,
      waiting: true // признак ожидания загрузки
    }
  }

  async getUser(id = 'self') {
    const token = getCookie('token');

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      },
    };
    try {
      const response = await fetch(`/api/v1/users/${id}?fields=*`, options);
      const json = await response.json();

      // Даные пользователя успешно получены
      this.setState({
        data: json.result,
        error: null,
        waiting: false
      }, 'Получены данные пользователя');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        error: e,
        waiting: false
      });
    }
  }

}

export default ProfileState;
