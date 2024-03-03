import {generateCode} from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

   /**
   * Добавление товара в корзину
  // @param code
   */
   addItemCart(code) {
    const newProduct = (this.state.list.filter(item => item.code === code));
    let isItemCode = false;   
    //Проверяем есть ли товар в корзине
    //Если товар есть, увеличиваем количество товара на 1
    const newListCart= this.state.listCart.reduce((acc, item) => {
      if (item.code !== newProduct[0].code) {
        acc.push(item)
      } else {
        isItemCode = true;
        acc.push({...item, countProduct: item.countProduct + 1})
      }
      return acc;
    }, []);
    // Если данного товара нету в корзине, инициализируем счетчик со значением 1
    // Добавляем новый товар в список товаров в корзине
    if (!isItemCode) {
      newProduct[0].countProduct = 1;
      newListCart.push(...newProduct);
    }
    // Новый список, в котором будет добавлен товар
    this.setState({
      ...this.state,
      listCart: [...newListCart]
    })
    // Подсчет итогового количества товара и стоимость
    this.calcTotalCart();
  };

  /**
   * Подсчет итогового количества товара и стоимость в корзине
   */
  calcTotalCart() {
    const counttotalPrice = this.state.listCart.reduce(
      (acc, item) => acc + item.countProduct * item.price, 0
    );
    this.setState({
      ...this.state, 
      totalCart : {
        totalProduct: (this.state.listCart).length, 
        totalPrice: counttotalPrice
      }
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItemCart(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      listCart: this.state.listCart.filter(item => item.code !== code)
    })
    this.calcTotalCart();
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }

  /**
   * Показывает или скрывает Cart (корзину)
   */
  showCart() {
    this.setState({...this.state, activeCart : !this.state.activeCart});
  }
}

export default Store;
