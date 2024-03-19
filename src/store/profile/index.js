import StoreModule from "../module";

class ProfileState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      email: '',
      name: '',
      phone: '',
      errorMessages: [],
    }
  }

  /**
   * Установка профиля пользователя
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initProfile(newParams = {}) {
    const token = window.localStorage.getItem('token');
    
    let validParams = {};

    if (token) {
      const response = await fetch('/api/v1/users/self?fields=profile,email', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'accept': 'application/json'
        }
      });
      const json = await response.json();

      if (json.error) {
        const errors = json.error.data.issues
          .filter((error) => error.message)
          .map((error) => error.message)

        validParams.errorMessages = errors;
      } else {
        validParams.email = json.result.email;
        validParams.phone = json.result.profile.phone;
        validParams.name = json.result.profile.name;
      }
    }
    await this.setParams({...this.initState(), ...validParams, ...newParams});
  }

   /**
   * Установка параметров
   * @param [newParams] {Object} Новые параметры
   * @returns {Promise<void>}
   */
   async setParams(newParams = {}) {
    // Установка новых параметров
    this.setState({
      ...this.getState(),
      ...newParams
    }, 'Установлены параметры профиля');
  }
}

export default ProfileState;
