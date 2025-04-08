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
  async addToBasket(_id) {
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
      // Поиск товара в разных источниках
      const item = await this.findItems(_id);

      if (!item) {
        console.log(`Товар с ID ${_id} не найден`);
      }
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
  }

  /**
   * Поиск товара в различных источниках
   */
  async findItems(_id) {
    //Проверяем каталог
    if (this.store.getState().catalog.list.length === 0) await this.store.actions.catalog.load();

    const catalogItem = this.store.getState().catalog.list.find(item => item._id === _id);
    if (catalogItem) return catalogItem;

    //Проверяем article (если есть)
    if (this.store.getState().article?.item?._id === _id) {
      return this.store.getState().article.item;
    }

    return null;
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
