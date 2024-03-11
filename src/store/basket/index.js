import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
      error: null
    }
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async addToBasket(_id) {
    let log = 'Добавление в корзину';
    let sum = 0;
    let loadingError;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = {...item, amount: item.amount + 1};
        log += ' повторно';
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
      let json, error;
      const query = '?fields=title,price';
      try {
        const response = await fetch('/api/v1/articles' + '/' + _id + query);
        json = await response.json();
      } catch(e) {
        error = e;
      }
      loadingError = error || json.error || null;
      if(json.result) {
        list.push({...json.result, amount: 1});
        sum += json.result.price;
        log += ' из АПИ';
      }
    }
    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length,
      error: loadingError,
    }, log);
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Удаление из корзины');
  }
}

export default Basket;
