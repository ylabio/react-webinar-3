import StoreModule from "../module";

/**
 * user
 */
class UserState extends StoreModule {

  initState() {
    return {
      userName:'',
      _id:'',
      data:{},
      token:'',
      isAuth:false,
      waiting: false, // признак ожидания загрузки
      error:null,

    }
  }

  async auth(data) {
    this.setState({
      userName:'',
      isAuth:false,
      waiting: true // признак ожидания загрузки
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
      debugger
      this.setState({
        token: json.result.token,
        userName:json.result.user.username,
        _id:json.result.user._id,
        waiting: false
      }, 'Авторизован успешно');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        userName:'',
        isAuth:false,
        waiting: false, // признак ожидания загрузки
        error:e
      });
    }
  }
}

export default UserState;
