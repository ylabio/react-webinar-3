import StoreModule from '../module';

class Basket extends StoreModule {
  initState() {
    const saved = localStorage.getItem('basket');
    return saved ? JSON.parse(saved) : { 
      list: [], 
      sum: 0, 
      amount: 0 
    };
  }

  saveState(state) {
    localStorage.setItem('basket', JSON.stringify(state));
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async addToBasket(_id) {
    let item = this.store.getState().catalog.list.find(i => i._id === _id);
    if (!item) {
      try {
        const res = await fetch(`/api/v1/articles/${_id}`);
        item = (await res.json()).result;
      } catch (e) {
        console.error('Ошибка загрузки товара', e);
        return;
      }
    }

    const list = [...this.getState().list];
    const existing = list.find(i => i._id === _id);
    
    if (existing) {
      existing.amount += 1;
    } else {
      list.push({...item, amount: 1});
    }

    const sum = list.reduce((acc, item) => acc + item.price * item.amount, 0);
    const newState = {
      list,
      sum,
      amount: list.length
    };

    localStorage.setItem('basket', JSON.stringify(newState));
    this.setState(newState);
  }

    /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    const list = this.getState().list.filter(i => i._id !== _id);
    const sum = list.reduce((acc, item) => acc + item.price * item.amount, 0);
    const newState = {
      list,
      sum,
      amount: list.length
    };

    localStorage.setItem('basket', JSON.stringify(newState));
    this.setState(newState);
  }
}

export default Basket;
