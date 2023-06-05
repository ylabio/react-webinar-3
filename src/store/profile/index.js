import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      data: {},
      error: null,
      waiting: false // признак ожидания загрузки
    }
  }

  /**
   * получение пользовательских данных
   */
  async getUser() {
    this.setState({ ...this.getState(), waiting: true });

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`/api/v1/users/self`, {
        headers: { "X-Token": token },
      });
      const json = await response.json();

      this.setState({ data: json.result, waiting: false });

    } catch (e) {
      this.setState({ data: {}, waiting: false });
    }


  }


}

export default ProfileState;
