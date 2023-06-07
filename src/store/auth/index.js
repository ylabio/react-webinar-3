import StoreModule from "../module";
import {setLocalStorageItem} from "../../utils";

/**
 * Состояние авторизации
 */
class UserState extends StoreModule {

  initState() {
    return {
      error: "", 
      username: ""
     }
  }

  /**
   * Отправка данных на сервер, проверка
   */
    async postData({login, password}, authed){
        const response = await fetch(`/api/v1/users/sign`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login,
                password,
            }),
        });
        const json = await response.json();

        if(response.ok) {
            setLocalStorageItem("token", json.result.token);
            setLocalStorageItem("name", json.result.user.profile.name);
            this.setState({
                ...this.getState(),
                username: json.result.user.profile.name
            }, "Cброшены данные в инпуте");
            return json;
        } else {
                this.setState({
                    ...this.getState(),
                    error: json.error.data.issues[0].message,
                }, "Ошибка от сервера");
        }
    } 
}

export default UserState;
