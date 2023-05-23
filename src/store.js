import {generateCode} from "./utils";
import React from 'react';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.basket = []; 
    this.showBasket = false;
    this.summa = 0;
    this.count = 0;
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

  getBasket() {
    return this.basket;
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

  setBasket(newState) {
    this.basket = newState;
    for (const listener of this.listeners) listener();
  }

  setShowBasket(newState) {
    this.showBasket = newState;
    for (const listener of this.listeners) listener();
  }

  setSumma(newState) {
    this.summa = newState;
    for (const listener of this.listeners) listener();
  }

  setCount(newState) {
    this.count = newState;
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  openBasket() {
    /* this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    }) */

    this.setShowBasket(true);
  };

  closeBasket() {
    this.setShowBasket(false);
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  addBasketItem(code) {
    /* this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    }) */

    let index = this.basket.findIndex(e => e.code === code);

    if (index === -1) {
      let id = this.state.list.findIndex(e => e.code === code);
      let element = this.state.list[id];
      element.count = 1;
      this.setBasket([...this.basket, element]);
    } else {
      let elem = this.basket;
      elem[index].count += 1;
      this.setBasket(elem);
    }

    let summa = 0;
    this.basket.forEach(element => {
      summa += element.count * element.price;
    });
    this.setSumma(summa);
    this.setCount(this.basket.length);
  };

  removeBasketItem(code) {
    this.setBasket( this.basket.filter(item => item.code !== code))

    let summa = 0;
    this.basket.forEach(element => {
      summa += element.count * element.price;
    });
    this.setSumma(summa);
    this.setCount(this.basket.length);
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  /* selectItem(code) {
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
  } */
}

export default Store;
