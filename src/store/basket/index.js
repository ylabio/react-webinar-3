import StoreModule from '../module';

class Basket extends StoreModule {
  initState() {
    return {
      list: JSON.parse(localStorage.getItem('basket')),
      sum:  Number(localStorage.getItem('sum')),
      amount: Number(localStorage.getItem('amout')),
      listEn: JSON.parse(localStorage.getItem('basketEn')),
    };
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */

  addToBasket(_id) {
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });

    const listEn = this.getState().listEn.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = { ...item, amount: item.amount + 1 };
      }
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
      if(this.store.getState().catalog.list.find(item => item._id === _id)){
        const item = this.store.getState().catalog.list.find(item => item._id === _id);
        const itemEn = this.store.getState().catalog.listEn.find(item => item._id === _id);
        list.push({ ...item, amount: 1 });
        listEn.push({ ...itemEn, amount: 1 }); // list уже новый, в него можно пушить.
        // Добавляем к сумме.
        sum += item.price;
      }else{
        const item = {
            title: this.store.getState().catalog.productTitleRu,
            price:  this.store.getState().catalog.productPrice,
            _id: this.store.getState().catalog.productId,
        };

        const itemEn = {
            title: this.store.getState().catalog.productTitleEn,
            price:  this.store.getState().catalog.productPrice,
            _id: this.store.getState().catalog.productId,
        };

              list.push({ ...item, amount: 1 });
              listEn.push({ ...itemEn, amount: 1 });

              sum += item.price;
      }
      
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
        listEn,
      },
      'Добавление в корзину',
    );
  
    localStorage.setItem('basket', JSON.stringify(list))
    localStorage.setItem('basketEn', JSON.stringify(listEn))
    localStorage.setItem('amout', list.length)
    localStorage.setItem('sum', sum)
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
    const listEn = this.getState().listEn.filter(item => {
      if (item._id === _id) return false;
      // sum += item.price * item.amount;
      return true;
    });

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
        listEn,
      },
      'Удаление из корзины',
    );

    localStorage.setItem('basket', JSON.stringify(list))
    localStorage.setItem('basketEn', JSON.stringify(list))
    localStorage.setItem('amout', list.length)
    localStorage.setItem('sum', sum)
  }


}

export default Basket;
