import StoreModule from "../module";

/**
 * Информация о профиле пользователя
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      profile: null,
      profileError: null
    }
  }

  getProfile = async () => {
    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: "GET",
        headers: {
          "X-Token": localStorage.getItem('token'),
          "Content-Type": "application/json"  
        }
      })
  
      const data = (await response.json()).result;
  
      this.setState({
        profile: data
      }, 'Загрузка пользователя');
    } catch (error) {
      this.setState({
        profileError: error
      }, 'Ошибка загрузки данных пользователя');
    }
  }
}

export default ProfileState;
