import StoreModule from "../module";
import {getAuthToken} from "../../utils";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      userData: null,
      waiting: false // признак ожидания загрузки
    }
  }

  async clear () {
    this.setState({
      ...this.getState(), userData: null
    })
  }

  /**
   * Загрузка товаров по id
   * @param id {String}
   * @return {Promise<void>}
   */
  async load() {
    this.setState({
      ...this.getState(), waiting: true
    })

    const response = await fetch('/api/v1/users/self', {
      headers: {
        "Content-Type": "application/json",
        "X-Token": getAuthToken() ?? ""
      }
    })

    const json = await response.json();

    let userData = null;

    if (response.status === 200) {
      userData = json?.result;
    }


    this.setState({
      ...this.getState(),
      waiting: false,
      userData,
    })
  }
}

export default ProfileState;
