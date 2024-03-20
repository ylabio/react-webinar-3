import StoreModule from "../module";

class Login extends StoreModule {

  initState() {
    return {
      isAuth: false,
      error: null,
      user: null
    };
  }

  /**
   * Инициализация параметров.
   */
  async initParams() {
    this.setState({
      ...this.getState(),
      error: null,
    })

    const token = localStorage.getItem('X-Token');

    if(token){
      const response = await fetch(`api/v1/users/self`,{
        headers:{
          'X-Token': token
        }
      });

      const json = await response.json();

      this.setState({
        ...this.getState(),
        isAuth: true,
        user: json.result
      }, 'Авторизованный пользователь');
    }

  }
  /**
   * Авторизация
   */
  async getAuthorization(body) {

    try {
      const response = await fetch('api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const json = await response.json();

      if(response.ok){
        localStorage.setItem('X-Token',json.result.token);
        // Авторизация прошла успешно
        this.setState({
          ...this.getState(),
          error: null,
          isAuth: true,
          user: json.result.user
        }, 'Авторизация прошла успешно');
      }else {
        // Ошибка
        this.setState({
          ...this.getState(),
          error: json.error.data.issues[0].message
        }, 'Ошибка авторизации');
      }
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        ...this.getState(),
        error: e.message
      }, 'Ошибка авторизации');
    }
  }

  async removeAuthorization(){
    const token = localStorage.getItem('X-Token');

    if(token){

      try {
        const response = await fetch('api/v1/users/sign', {
          method: 'DELETE',
          headers:{
            'X-Token': token
          }
        });

        if(response.ok){

          localStorage.removeItem('X-Token');
          // Выход прошел успешно
          this.setState({
            ...this.getState(),
            isAuth: false,
            user: null
          }, 'Авторизация прошла успешно');
        }

      } catch (e) {
        // Ошибка при загрузке
        // @todo В стейт можно положить информацию об ошибке
        this.setState({
          ...this.getState(),
          error: e.message
        }, 'Ошибка авторизации');
      }
    }
  }
}

export default Login;
