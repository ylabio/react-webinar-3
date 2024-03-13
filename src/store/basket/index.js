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
  addToBasket = async (_id) => {
    try {
      let sum = 0;
      let list = [...this.getState().list];
      let exist = false;

      // Ищем товар в корзине
      list = list.map(item => {
        let result = item;
        if (item._id === _id) {
          exist = true;
          result = {...item, amount: item.amount + 1};
        }
        sum += result.price * result.amount;
        return result;
      });

      if (!exist) {
        // Проверяем, существует ли товар в каталоге
        const catalogItem = this.store.getState().catalog.list.find(item => item._id === _id);
        if (!catalogItem) {
          // Если товар не найден в каталоге, делаем запрос на сервер
          const response = await fetch(`api/v1/articles/${_id}?fields=title,price`);
          const newItem = await response.json();
          list.push({_id: newItem.result._id, title: newItem.result.title, price: newItem.result.price, amount: 1});
          sum += newItem.result.price;
        } else {
          // Если товар найден в каталоге, используем его данные
          list.push({...catalogItem, amount: 1});
          sum += catalogItem.price;
        }
      }

      // Обновляем состояние корзины
      this.setState({
        ...this.getState(),
        list,
        sum,
        amount: list.length
      }, 'Добавление в корзину');
    } catch (error) {
      console.error('Ошибка добавления в корзину:', error);
    }
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
