import StoreModule from '../module';

/**
 * Покупательская корзина
 */
class BasketState extends StoreModule {
  initState() {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      try {
        const parsed = JSON.parse(savedBasket);
        // Проверяем структуру загруженных данных
        if (
          Array.isArray(parsed.list) &&
          typeof parsed.sum === 'number' &&
          typeof parsed.amount === 'number'
        ) {
          return parsed;
        }
      } catch (e) {
        console.error('Ошибка при загрузке корзины из LocalStorage:', e);
      }
    }
    // Возвращаем начальное состояние, если сохранённых данных нет
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  /**
   * Добавление товара в корзину
   * @param _id {String} Код товара
   */
  async addToBasket(_id) {
    let sum = 0;
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true;
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      const response = await fetch(`/api/v1/articles/${_id}`);
      const json = await response.json();
      const item = json.result;
      list.push({ ...item, amount: 1 });
      sum += item.price;
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Добавление в корзину',
    );
    localStorage.setItem('basket', JSON.stringify(this.getState()));
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

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Удаление из корзины',
    );
    localStorage.setItem('basket', JSON.stringify(this.getState()));
  }
}

export default BasketState;