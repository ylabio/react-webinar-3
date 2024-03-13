import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0
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
    const list = this.getState().list.slice();
      const itemInBasket = list.find(item => item._id === _id);
      if (itemInBasket) {
          itemInBasket.amount += 1;
          exist = true;
      }

      list.forEach(item => {
          sum += item.price * item.amount;
      });

      if (!exist) {
          const catalogState = this.store.getState().catalog;
          let item = catalogState.list.find(item => item._id === _id);

        
          if (!item && catalogState.currentItem && catalogState.currentItem._id === _id) {
              item = catalogState.currentItem;
          }

          if (item) {
              list.push({ ...item, amount: 1 });
              sum += item.price;
          } else {
             
              console.error('Товар не найден в каталоге и currentItem');
              return;
          }
    }

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Добавление в корзину');
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
