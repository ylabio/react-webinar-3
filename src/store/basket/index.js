import StoreModule from '../module';

class Basket extends StoreModule {
  initState() {
    // Пытаемся загрузить состояние из localStorage
    const savedState = localStorage.getItem('basket');
    return savedState 
      ? JSON.parse(savedState)
      : {
          list: [],
          sum: 0,
          amount: 0,
        };
  }

  /**
   * Сохраняет текущее состояние корзины в localStorage
  */
  saveState() {
    localStorage.setItem('basket', JSON.stringify(this.getState()));
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  addToBasket(_id) {
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
      const item = this.store.getState().catalog.list.find(item => item._id === _id);
      list.push({ ...item, amount: 1 }); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      sum += item.price;
    }

    const newState = {
      ...this.getState(),
      list,
      sum,
      amount: list.length,
    };
    
    this.setState(newState, 'Добавление в корзину');
    this.saveState(); // Сохраняем новое состояние
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

    const newState = {
      ...this.getState(),
      list,
      sum,
      amount: list.length,
    };
    
    this.setState(newState, 'Удаление из корзины');
    this.saveState(); // Сохраняем новое состояние
  }
}

export default Basket;
