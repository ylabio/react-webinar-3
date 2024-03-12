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
    let exist = false;
    const stateList = this.getState().list;
    let list = [...stateList];
    let item = this.store
      .getState()
      .catalog.list.find((item) => item._id === _id);

    list = stateList.map((item) => {
      if (item._id === _id) {
        exist = true;
        sum += item.price * (item.amount + 1);

        return { ...item, amount: item.amount + 1 };
      } else {
        sum += item.price * item.amount;
        return item;
      }
    });

    if (!exist) {
      if (!item) {
        try {
          const response = await fetch(
            `api/v1/articles/${_id}?fields=title,price`
          );
          const data = await response.json();
          item = {
            ...data.result,
            amount: 1,
          };
          console.log(item);
          list.push(item);
          sum += item.price * item.amount;
          console.log(list);
        } catch (error) {
          console.error(error);
          return;
        }
      } else {
        list.push({ ...item, amount: 1 });
        sum += item.price;
      }
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
