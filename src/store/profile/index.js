import StoreModule from '../module';

/**
 * Детальная информация о пользователе
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
      error: null,
    };
  }

  /**
   * Загрузка информации о профиле
   * @return {Promise<void>}
   */
  async loadUserInfo() {
    this.setState({
      ...this.getState(),
      error: null,
      waiting: true,
    })  
    try {
      const token = localStorage.getItem('userToken')
      if (!token) {
        throw new Error('Токен не найден')
      }
      const response = await fetch('/api/v1/users/self?fields=email,username,profile(name, phone)', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'X-Token': token
        }
      })
      const json = await response.json()
      
      if(!response.ok) {
        throw new Error(json.error.data.issues[0].message)
      }

      this.setState({
        ...this.getState(),
        data: json.result,
        waiting: false,
        isAuth: true,
      }, 'Информация о пользователе загружена из АПИ')
    } catch (error) {
      // Удаление испорченного токена
      localStorage.removeItem('userToken')
      localStorage.removeItem('isAuth')
      this.setState({
        ...this.getState(),
        waiting: false,
      })
    }
  }
}

export default ProfileState;
