import StoreModule from "../module";
import {getToken} from "../token";

/**
 * Детальная информация о пользователе для страницы профайла
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      user: {},
      isExist: false,
      waiting: false
    }
  }

  /**
   * Загрузка данных юзера по токену текущего юзера
   */
  async load() {
    // Установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true
    });

    const token = getToken();

    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': `${token}`
        }
      });

      const json = await response.json();

      this.setState({
        ...this.getState(),
        user: json.result,
        isExist: true,
        waiting: false,
      }, 'Данные пользователя загружены успешно');

    } catch (err) {
      // Сохраняем данные об ошибке в стейт
      this.setState({
        user: {},
        isExist: false,
        waiting: false
      }, 'Загрузка данных пользователя не удалась');
    }
  }  
}

export default ProfileState;
