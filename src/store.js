class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addItem(item) {
    const isItemExist = this.state.basket.some(el => el.code === item.code)

    if (!isItemExist) {
      this.setState({
        ...this.state,
        basket: [...this.state.basket, {...item, count: 1}]
      })

      this.state.totalCount += 1;
    } else {
      this.setState({
        ...this.state,
        basket: this.state.basket.map(el => {
          if (el.code === item.code) {
            return {...el, count: el.count + 1};
          }
          return el
        })
      })
    }

    this.state.totalPrice += item.price;
  }

  deleteItem(item) {
      this.setState({
        ...this.state,
        basket: this.state.basket.filter(el => el.code !== item.code)
      })

      this.state.totalCount -= 1;
      this.state.totalPrice -= item.price * item.count;
  };
}

export default Store;
