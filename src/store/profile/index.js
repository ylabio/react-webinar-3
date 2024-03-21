import StoreModule from "../module";

/**
 * user
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      waiting: false, // признак ожидания загрузки
      error:null,
      data:{
        userName:'',
        phone:null,
        email:''
      },
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
      this.setState({
        ...this.getState(),
        data:{
          userName:json.result.profile.name,
          phone:json.result.profile.phone,
          email:json.result.email
        },
        waiting: false, // признак ожидания загрузки
        error:null,
      }, 'Данные профиля загружены');
      return {userName:json.result.profile.name}
    } catch (e) {
      console.error(e.message)
    }
  }
}

export default ProfileState;
