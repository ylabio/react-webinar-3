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
  addToBasket(_id) {
    let sum = 0;
    let list = this.getState().list.slice(); // Создаем копию текущего списка товаров

    // Ищем товар в корзине, чтобы увеличить его количество
    let existingItem = list.find(item => item._id === _id);

    if (existingItem) {
        // Если товар уже присутствует в корзине, увеличиваем его количество
        existingItem.amount++;
    } else {
        // Если товар не найден в корзине, тогда делаем запрос к API для получения информации о товаре
        fetch(`/api/v1/articles/${_id}?fields=category(title),price,edition,description,madeIn(title),edition,title`)
            .then(response => response.json())
            .then(data => {
                const newItem = data.result;
                newItem.amount = 1;
                list.push(newItem);

                sum += newItem.price;

                this.updateBasket(list, sum);
            })
            .catch(error => {
                console.error("Error fetching product information: ", error);
                // Обработка ошибки при запросе данных о товаре
            });
    }

    if (existingItem) {
        // Пересчитываем общую сумму для уже существующих товаров
        sum = list.reduce((total, item) => total + item.price * item.amount, 0);
    }

    this.updateBasket(list, sum);
}

updateBasket(list, sum) {
    this.setState({
        ...this.getState(),
        list,
        sum,
        amount: list.length,
    }, "Добавление в корзину");
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
