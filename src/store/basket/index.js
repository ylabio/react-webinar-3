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
    
    if(!exist){
      let existInCache = false;
      let item = this.store.getState().catalog.list.find(item => item._id === _id);
      if(item) existInCache = true
      if(!existInCache){
      const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`,{
        headers: {
                'Accept-Language': this.store.getState().locale.lang
        }
      });
      const {result} = await response.json();
      item = result
    }
      list.push({...item, amount: 1});
      sum += item.price;
    }

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
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

  async reRender(_id) {
    const list = await Promise.all(
      this.getState().list.map(async (item) =>  {
      const response = await fetch(`/api/v1/articles/${item._id}?fields=*,madeIn(title,code),category(title)`,{
        headers: {
                'Accept-Language': this.store.getState().locale.lang
        }
      });
      const {result} = await response.json();
      const newItem = result
      return {...newItem,amount : item.amount};
    }));

    this.setState({
      ...this.getState(),
      list,
    }, 'Ререндер корзины');
  }
}

export default Basket;
