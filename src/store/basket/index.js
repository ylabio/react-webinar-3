import StoreModule from '../module';

class Basket extends StoreModule {
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
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
      this.loadItem(_id, list, sum);
      return;
    }
    this.setAdditionState(list, sum);
  }

  async loadItem(id, list, sum) {
    const response = await fetch(`/api/v1/articles/${id}?fields=_id,title,price,description,edition,madeIn(title,code),category(title)`);
    const item = await response.json();
    list.push({ ...item.result, amount: 1 }); // list уже новый, в него можно пушить.
    // Добавляем к сумме.
    sum += item.result.price;
    this.setAdditionState(list, sum);
  }

  setAdditionState(list, sum) {
    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Добавление в корзину',
    );
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
  }
}

export default Basket;
