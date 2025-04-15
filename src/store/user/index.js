import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      token: localStorage.getItem('token') || null, // Токен из localStorage
      data: null, // Данные пользователя
      error: null, // Ошибка авторизации
      waiting: false // Состояние загрузки
    };
  }

  /**
   * Авторизация пользователя
   * @param login {String}
   * @param password {String}
   */
  async signIn(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null
    });
  
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      });
      
      const json = await response.json();
  
      if (response.ok) {
        console.error('Server error response:', json);
        localStorage.setItem('token', json.result.token);
        
        this.setState({
          ...this.getState(),
          token: json.result.token,
          data: null,
          waiting: false
        });
  
        return true;
      } else {
        // Обработка ошибки в формате сервера
        let errorMessage = 'Unknown error';
        if (json.error?.data?.issues?.[0]?.message) {
          errorMessage = json.error.data.issues[0].message;
        } else if (json.error) {
          errorMessage = json.error;
        }
        
        throw new Error(errorMessage);
      }
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
        waiting: false
      });
      return false;
    }
  }

  /**
   * Сброс ошибки авторизации
   */
  clearError() {
    this.setState({
      ...this.getState(),
      error: null,
    }, 'Сброс ошибки входа');
  }

  /**
   * Выход пользователя
   */
  async signOut() {
    try {
      const basketState = this.store.getState().basket;

      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': this.getState().token,
          'Content-Type': 'application/json'
        }
      });
    } finally {
      // Очищаем корзину
    this.store.actions.basket.clearBasket();
    
    // Очищаем данные пользователя
      localStorage.removeItem('token');
      this.setState({
        token: null,
        data: null,
        error: null
      });
    }
  }

  /**
   * Загрузка данных пользователя
   */
  async load() {
    if (!this.getState().token) return;

    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': this.getState().token,
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();

      //console.log('Данные пользователя из API:', json.result);

      this.setState({
        ...this.getState(),
        data: json.result,
        waiting: false
      });
    } catch (e) {
      localStorage.removeItem('token');
      this.setState({
        token: null,
        data: null,
        waiting: false
      });
    }
  }
}

export default UserState;