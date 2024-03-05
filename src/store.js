import {generateCode} from "./utils";

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
  addItem(code) {
    if (!this.getState().cart.list.find(el => el.code === code)) {
     this.state.cart.list.push({...this.getState().list.find(el => el.code === code), count: 1})
    } else {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          list: this.state.cart.list.map(el => {
            if (el.code === code) {
              return {
                ...el,
                count: el.count + 1
              }
            }
            return el;
          })
        },
        
      })
    }

    if(this.getState().cart.list.length) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          totalSum: this.state.cart.list.reduce((acc, el) => {
            return acc += (el.price * el.count)
          }, 0),
          quantity: this.state.cart.list.length,
        }
      })
    }
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: {
        list: this.state.cart.list.filter(item => item.code !== code),
        totalSum: this.state.cart.list.reduce((acc, el) => {
          return acc += (el.price * el.count)
        }, 0),
        quantity: this.state.cart.list.length,
      }
    })

    this.getCartInfo();
  }

  getCartInfo() {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: {
        ...this.state.cart,
        totalSum: this.state.cart.list.reduce((acc, el) => {
          return acc += (el.price * el.count)
        }, 0),
        quantity: this.state.cart.list.length,
      }
    })
  }

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

  closeCart() {
    console.log('close cart button clicked!');
    this.setState({ 
      ...this.state,
      isOpenCart: false
    })
  }


  openCart() {
    this.setState({
      ...this.state,
      isOpenCart: true

    })

  }
}



export default Store;
