import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class UserState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: {
        name: "",
        phoneNumber: "",
        email: "",
      },
      waiting: false,
    };
  }

  async getData() {
    const token = JSON.parse(window.localStorage.getItem("XToken"));
    if (token) {
      this.setState({
        ...this.getState(),
        waiting: true,
      });
      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });

      if (response.status === 200) {
        const json = await response.json();

        this.setState({
          data: {
            name: json.result.profile.name,
            phoneNumber: json.result.profile.phone,
            email: json.result.email,
          },
          waiting: false,
        });
      }
    }
  }
}

export default UserState;
