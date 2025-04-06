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
  

  addOrUpdateItem(item) {
    const state = this.getState();
    let sum = 0;
    let exist = false;

    console.log(state)

    const list = state.list.map(existingItem => {
      if (existingItem._id === item._id) {
        exist = true;
        const updatedItem = { ...existingItem, amount: existingItem.amount + 1 };
        sum += updatedItem.price * updatedItem.amount;
        return updatedItem;
      } else {
        sum += existingItem.price * existingItem.amount;
        return existingItem;
      }
    });

    if (!exist) {
      list.push({ ...item, amount: 1 });
      sum += item.price;
    }

    this.setState(
      {
        ...state,
        list,
        sum,
        amount: list.length,
      },
      'Добавление в корзину',
    );
  }

  addToBasket(_id) {
    const item = this.store.getState().catalog.list.find(item => item._id === _id);
    if (!item) {
      throw new Error('Товар не найден в каталоге');
    }
    this.addOrUpdateItem(item);
  }

  addToBasketFromItemPage(_id) {
    const item = this.store.getState().itemInfo.item;
    if (item._id !== _id) {
      throw new Error('ID не совпадает');
    }
    this.addOrUpdateItem(item);
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
