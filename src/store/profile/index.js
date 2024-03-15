import StoreModule from "../module";

/**
 * profile
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      data:{},
      waiting: false, // признак ожидания загрузки
      error:null,
    }
  }

  async load() {
    this.setState({
      data:{},
      waiting: true, // признак ожидания загрузки
      error:null,
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
      debugger
      // Авторизован успешно
      // this.setState({
      //   token: json.token,
      //   userName:json.user.username,
      //   _id:json.user._id,
      //   waiting: false
      // }, 'Авторизован успешно');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        data:{},
        waiting: true, // признак ожидания загрузки
        error:null,
      });
    }
  }
}

export default ProfileState;
