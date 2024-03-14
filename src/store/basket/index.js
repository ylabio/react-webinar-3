import StoreModule from "../module";

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
    const list = this.getState().list.map((item) => {
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
      let item = this.store.getState().catalog.list.find(item => item._id === _id) ??
      this.store.getState().productDetails.result;
     /*  const response = await fetch(
        `http://example.front.ylab.io/api/v1/articles/${_id}`
      );
      let data = await response.json(); */
      // const item = data.result;
      /*  if ((item === undefined)) {
        const product = this.store.getState().productDetailts.result;
        if (product && (product._id === _id)) {
          item = {
            _id: product._id,
            title: product.title,
            price: product.price,
          }
        }
      } */
      list.push({
        ...item,
        amount: 1
      });
      /* list.push({
        _id: item._id,
        price: item.price,
        title: item.title,
        amount: 1
      }); */ // list уже новый, в него можно пушить.
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
      "Добавление в корзину"
    );
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter((item) => {
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
      "Удаление из корзины"
    );
  }
}

export default Basket;
