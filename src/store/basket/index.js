import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
      isError: false
    }
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async addToBasket(_id, language='ru') {
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
      try {
        const res = await fetch(
          `/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)&lang=${language}`
          );
        const json = await res.json();
        const item = json.result;
        list.push({...item, amount: 1});
        sum +=item.price;
      }
      catch(error) {
        this.setState({
          ...this.getState(),
          isError: true
        }, `ошибка загрузки товара`)
      }
    }

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length,
      isError: false
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
