import StoreModule from "../module";

/**
 * user
 */
class UserState extends StoreModule {
  initState() {
    return {
      isAuth:false,
      waiting: false, // признак ожидания загрузки
      error:null,
      data:{
        userName:'',
        phone:null,
        email:''
      },
    }
  }

  async login(data) {
    this.setState({
      ...this.getState(),
      waiting:true
    });
    try {
      const response = await fetch(`/api/v1/users/sign`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      // Авторизован успешно
      localStorage.setItem('access_token', json.result.token);
      this.setState({
        ...this.getState(),
        isAuth:true,
        waiting:false,
        data:{
          userName:json.result.user.username,
        }
      }, 'Авторизован успешно');
      return true
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        waiting:false,
        error:e
      });
    }
  }
  async logout() {
    this.setState({
      ...this.getState(),
      waiting:true
    });
    try {
      const response = await fetch(`/api/v1/users/sign`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token":localStorage.getItem('access_token')
        }
      });
      const json = await response.json();
      // выход успешно
      localStorage.removeItem('access_token', json.result.token);
      this.setState({
        ...this.getState(),
        isAuth:false,
        waiting:false,
        data:{
          userName:'',
          phone:null,
          email:''
        },
      }, 'выход успешно');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        waiting: false, // признак ожидания загрузки
        error:e
      });
    }
  }
  async load() {
    this.setState({
      ...this.getState(),
      waiting: true, // признак ожидания загрузки
    });

    try {
      const response = await fetch(`/api/v1/users/self?fields=*`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token":localStorage.getItem('access_token')
        },
      });
      const json = await response.json();
      // данные профиля загружены успешно
      this.setState({
        ...this.getState(),
        isAuth:true,
        data:{
          userName:json.result.profile.name,
          phone:json.result.profile.phone,
          email:json.result.email
        },
        waiting: false, // признак ожидания загрузки
        error:null,
      }, 'Данные профиля загружены');
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        waiting: false, // признак ожидания загрузки
        error:e,
      });
    }
  }
}

export default UserState;
