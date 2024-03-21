import StoreModule from "../module";

/**
 * user
 */
class UserState extends StoreModule {
  initState() {
    return {
      isAuth:!!window.localStorage.getItem('access_token'),
      waiting: false, // признак ожидания загрузки
      error:null,
      data:{
        userName:'',
      },
    }
  }
  setStatus(userName){
    this.setState({
      ...this.getState(),
      isAuth:true,
      data:{
        userName:userName,
      }
    });
  }
  resetError(){
    this.setState({
      ...this.getState(),
      error:null
    });
  }
  async login(data) {
    this.setState({
      ...this.getState(),
      waiting:true,
      error:null,
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
      if(!json.error){
        this.setState({
          ...this.getState(),
          isAuth:true,
          waiting:false,
          data:{
            userName:json.result.user.profile.name,
          }
        }, 'Авторизован успешно');
        localStorage.setItem('access_token', json.result.token);
        return true
      }else{
        this.setState({
          ...this.getState(),
          waiting:false,
          error: json.error.data.issues[0].message,
        })
      }
    } catch (e) {
      console.error(e.message)
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
        },
      }, 'выход успешно');

    } catch (e) {
      // Ошибка при загрузке
      console.error(e.message)
    }
  }
}

export default UserState;
