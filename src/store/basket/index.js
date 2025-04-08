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
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      try {
        // Это на случай если store.catalog пустой (например после перезагрузки страницы article)
        if (this.store.getState().catalog.list.length === 0) {
          await this.store.actions.catalog.load();
        }

        const item = this.store.getState().catalog.list.find(item => item._id === _id);
        
        // Если товар не найден в каталоге, используем данные из article
        if (!item && this.store.getState().article.itemInfo._id === _id) {
          const articleItem = this.store.getState().article.itemInfo;
          list.push({ ...articleItem, amount: 1 });
          sum += articleItem.price;
        } else if (item) {
          list.push({ ...item, amount: 1 }); // list уже новый, в него можно пушить
          sum += item.price;
        } else {
          console.error('Товар не найден ни в каталоге, ни в текущем просматриваемом товаре');
          return; // Прерываем выполнение, если товар не найден
        }
      } catch (error) {
        console.error('Ошибка при добавлении товара в корзину:', error);
        return; // Прерываем выполнение в случае ошибки
      }
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
