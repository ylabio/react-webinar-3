import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
      product: {
        _id: '0',
        title: 'Название товара',
        description: 'Описание товара',
        madeIn: 'Страна производитель',
        category: 'Категория',
        edition: 'Год выпуска',
        price: 0,
      }
    }
  }

  async loadProductToAsyncById(_id) {
    if (_id == '0' || _id == 0) return;
    const vRequest = `/api/v1/articles/${_id}?fields=_id,title,description,edition,price,madeIn(title,code),category(title)`;
    const response = await fetch(vRequest);
    const json = await response.json();
    this.loadProduct(json.result._id,
                     json.result.title,
                     json.result.description,
                     json.result.madeIn.title + ' (' + json.result.madeIn.code + ')',
                     json.result.category.title,
                     json.result.edition,
                     json.result.price);
  }

  loadProduct(_id,title,description,madeIn,category,edition,price) {
    let product = this.getState().product;
    product._id = _id;
    product.title = title;
    product.description = description;
    product.madeIn = madeIn;
    product.category = category;
    product.edition = edition.toString();
    product.price = price;
    this.setState({
      ...this.getState(),
      product: product,
    }, 'Изменение свойств товара');
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  addToBasket(_id,flag) {
    if (_id <= 0) return;
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    let list;
    if (this.getState().list.length >= 1) {
      list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = {...item, amount: item.amount + 1};
      }
      sum += result.price * result.amount;
      return result;
    });
    }
  if (flag == 0 || exist == true) {
    if (!exist) {
      if (this.getState().list.length == 0) list = [];
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
      const item = this.store.getState().catalog.list.find(item => item._id === _id);
      list.push({...item, amount: 1}); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      sum += item.price;
    }
    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length,
    }, 'Добавление в корзину');
  }
  else {
    if (!exist) {
      if (this.getState().list.length == 0) list = [];
    }
    let vProduct = this.getState().product;
    sum += vProduct.price;
    this.setState({
      ...this.getState(),
      list: [...list, {_id: _id, title: vProduct.title, price: vProduct.price, amount: 1}],
      sum,
      amount: list.length + 1,
    }, 'Добавление в корзину №2')
  }
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    if (_id <= 0) return;
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
      amount: list.length,
    }, 'Удаление из корзины');
  }
}

export default Basket;
