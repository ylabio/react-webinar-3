import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class User extends StoreModule {

  initState() {
    return {
      user: null,
      error: ''
    }
  }

  /**
   * Загрузка товаров по id
   * @param data {{login: string, password: string}}
   * @return {Promise<void>}
   */
  async login(data) {

    try {
      const response = await fetch(`api/v1/users/sign`, {
        method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(data),
      });

      const json = await response.json();

      if (json?.result) {
        localStorage.setItem('token', json?.result?.token);
        this.setState({
          user: json?.result?.user,
        }, 'Авторизация прошла успешно');
      }
      

    } catch (error) { 

      this.setState({
        error: error,
      }, 'Произошла ошибка.');
    }
  }

  async getUser(){
    try {
      const response = await fetch('api/v1/users/self', {
        method: 'GET',
				headers: {
					'X-Token': localStorage.getItem('token'),
					'Content-type': 'application/json',
				},
      })
      const json = await response.json();
      console.log(json);
    } catch (error) {
      this.setState({
        error: error,
      }, 'Произошла ошибка.');    }
  }

  async logOut(){
    try {
			const responce = await fetch('api/v1/users/sing', {
				method: 'DELETE',
				headers: {
					'X-Token': localStorage.getItem('token'),
					'Content-type': 'application/json',
				},
			});
			const json = await responce.json();
			localStorage.removeItem('token')

			this.setState({
				...this.getState(),
				user: null,
			});

		} catch (error) {
      this.setState({
        error: error,
      }, 'Произошла ошибка.');		}
  }
}

export default User;
