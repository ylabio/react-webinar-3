import StoreModule from "../module";

/**
 * Состояние профиля 
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      error: "", 
      username: "",
      phone: "",
      email: ""
     }
  }

    async getUserData(token) {
        this.setState({
            ...this.getState(),
         }, `Получение данных пользователя`);

         const response = await fetch('/api/v1/users/self', {
            headers: {
               'Content-Type': 'application/json',
               'X-Token': token
            } 
         })

         const json = await response.json();
         this.setState({
            ...this.getState(),
            username: json.result.profile.name,
            phone: json.result.profile.phone,
            email: json.result.email
         }, `Запись данных пользователя`);
    }

    resetState() {
        this.setState(this.initState());
    }
}

export default ProfileState;
