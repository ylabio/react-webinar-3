import StoreModule from "../module";

class Basket extends StoreModule {
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  async fetchItemData(_id) {
    try {
      const response = await fetch(`/api/v1/articles/${_id}`);
      const json = await response.json();
      return json.result;
    } catch (error) {
      console.error("Error fetching item data:", error);
      throw error;
    }
  }

  async addToBasket(_id) {
    try {
      const item = await this.fetchItemData(_id);
      const { list, sum } = this.getState();
      const existingItem = list.find((item) => item._id === _id);

      if (existingItem) {
        const updatedList = list.map((item) => {
          if (item._id === _id) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        });

        const updatedSum = sum + item.price;
        const updatedAmount = updatedList.length;

        this.setState(
          {
            ...this.getState(),
            list: updatedList,
            sum: updatedSum,
            amount: updatedAmount,
          },
          "Добавление в корзину"
        );
      } else {
        const updatedList = [...list, { ...item, amount: 1 }];
        const updatedSum = sum + item.price;
        const updatedAmount = updatedList.length;

        this.setState(
          {
            ...this.getState(),
            list: updatedList,
            sum: updatedSum,
            amount: updatedAmount,
          },
          "Добавление в корзину"
        );
      }
    } catch (error) {
      console.error("Error adding item to basket:", error);
    }
  }

  removeFromBasket(_id) {
    const { list, sum } = this.getState();
    const updatedList = list.filter((item) => item._id !== _id);
    const updatedSum = updatedList.reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    );
    const updatedAmount = updatedList.length;

    this.setState(
      {
        ...this.getState(),
        list: updatedList,
        sum: updatedSum,
        amount: updatedAmount,
      },
      "Удаление из корзины"
    );
  }
}

export default Basket;
