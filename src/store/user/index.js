import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      token: localStorage.getItem('token') || null, // Токен из localStorage
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
      
      const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = data?.error?.message || 
                          data?.error?.data?.issues?.[0]?.message || 
                          `HTTP Error ${response.status}`;
      throw new Error(errorMessage);
    }

    localStorage.setItem('token', data.result.token);
    this.setState({token: data.result.token});
    await this.store.actions.profile.load();
    
    return true;

  } catch (e) {
    this.setState({
      error: e.message.includes('Failed to fetch') ? 
            'Network Error' : e.message,
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

    this.store.actions.profile.setState({data: null});
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

      // проверка статуса ответа
      if (response.status === 401) {
        throw new Error('Invalid token');
      }
      console.log("Статус:", response.status);

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