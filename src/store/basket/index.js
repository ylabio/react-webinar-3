import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
      isFetching: false,
      isSuccess: false
    }
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
        result = {...item, amount: item.amount + 1};
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
      const item = this.store.getState().catalog.list.find(item => item._id === _id);

      if (item) {
        list.push({...item, amount: 1}); // list уже новый, в него можно пушить.
        // Добавляем к сумме.
        sum += item.price;
      } else {
        this.setState({
          ...this.getState(),
          isFetching: true
        }, 'Запрос цены товара ' + _id);
        const response = await fetch(`/api/v1/articlesa/${_id}`);
        if (response.status === 200) {
          const json = await response.json();
          list.push({_id: json.result._id, title: json.result.title, price: json.result.price, amount: 1});
          sum += json.result.price;
          this.setState({
            ...this.getState(),
            list,
            sum,
            amount: list.length,
            isFetching: false,
            isSuccess: true
          }, 'Добавление в корзину через запрос');
        } else {
          this.setState({
            ...this.getState(),
            isFetching: false,
            isSuccess: false
          }, 'Ошибка запроса цены товара ' + _id);
        }
        return;
      }
    }

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length,
      isFetching: false,
      isSuccess: true
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
