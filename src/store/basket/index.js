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
  /* addToBasket(_id) {
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
  addToBasketFromItemPage(_id) {
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
      const item = this.store.getState().itemInfo.item;
      if (item._id === _id) {
        list.push({ ...item, amount: 1 });
      } else {
        throw new Error('ID не совпадает');
      }
      // list уже новый, в него можно пушить.
      // Добавляем к сумме.
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
  } */

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
