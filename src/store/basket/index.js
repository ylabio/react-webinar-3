import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    const list = JSON.parse(localStorage.getItem('basket-list'))
    const sum = JSON.parse(localStorage.getItem('basket-sum'))
    const amount = JSON.parse(localStorage.getItem('basket-amount'))
    console.log('Basket :', list)
    return {
      list: list || [],
      sum: sum || 0,
      amount: amount || 0
    }
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
        result = {...item, amount: item.amount + 1};
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
      if (this.store.getState().catalog.list.length) {
        const item = this.store.getState().catalog.list.find(item => item._id === _id);
        list.push({...item, amount: 1}); // list уже новый, в него можно пушить.
        // Добавляем к сумме.
        sum += item.price;
      } else {
        const item = this.store.getState().catalog.product.find(item => item._id === _id);
        list.push({...item, amount: 1});
        sum += item.price;
      }
    }
    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Добавление в корзину');
    localStorage.setItem('basket-list', JSON.stringify(list));
    localStorage.setItem('basket-sum', JSON.stringify(sum));
    localStorage.setItem('basket-amount', JSON.stringify(list.length));
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
    localStorage.setItem('basket-list', JSON.stringify(list));
    localStorage.setItem('basket-sum', JSON.stringify(sum));
    localStorage.setItem('basket-amount', JSON.stringify(list.length))
  }
}

export default Basket;
