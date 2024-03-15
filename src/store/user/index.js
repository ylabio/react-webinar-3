import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class UserState extends StoreModule {

  initState() {
    return {
      login:'',
      isAuth:false,
      waiting: false // признак ожидания загрузки
    }
  }

  async auth(data) {
    this.setState({
      login:'',
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
      debugger
      // Товар загружен успешно
      // this.setState({
      //   data: json.result,
      //   waiting: false
      // }, 'Загружен товар из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      // this.setState({
      //   data: {},
      //   waiting: false
      // });
    }
  }
}

export default UserState;
