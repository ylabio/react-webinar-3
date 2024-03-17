import StoreModule from "../module";

class UserState extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      user: {
        login: null,
        password: null,
      },
      waiting: false
    }
  }

}

export default UserState;