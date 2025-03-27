/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      list: initState.list || [], // Initialize list
      cart: initState.cart || [], // Initialize cart
    };
    this.listeners = []; // Слушатели изменений состояния

    // Инициализируем lastCode на основе существующих записей или 0, если записей нет.
    this.lastCode = initState.list && initState.list.length > 0
      ? Math.max(...initState.list.map(item => item.code))
      : 0;
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
    };
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
   * Добавление новой записи с уникальным кодом или увеличение её количества
   * @param code {Number} Код продукта
   */
  addItem(code) {
    const product = this.state.list.find(item => item.code === code);

    if (!product) {
      console.error(`Product with code ${code} not found in the product list.`);
      return;
    }

    const existingCartItem = this.state.cart.find(item => item.code === code);

    if (existingCartItem) {
      // Если продукт уже в корзине, увеличиваем его количество
      this.setState({
        ...this.state,
        cart: this.state.cart.map(item =>
          item.code === code ? { ...item, count: (item.count || 1) + 1 } : item
        ),
      });
      console.log(`Product updated in cart:`, existingCartItem);
    } else {
      // Если продукта нет в корзине, добавляем его
      const newCartItem = { ...product, count: 1 };
      this.setState({
        ...this.state,
        cart: [...this.state.cart, newCartItem],
      });
      console.log(`Product added to cart:`, newCartItem);
    }

    console.log(`Cart:`, this.state.cart);
  }

  /**
   * Удаление записи по коду
   * @param code {Number} Код продукта
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Удаляем элемент из списка продуктов
      list: this.state.list.filter(item => item.code !== code),
      // Удаляем элемент из корзины
      cart: this.state.cart.filter(item => item.code !== code),
    });

    console.log(`Item with code ${code} has been deleted from both list and cart.`);
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code && !item.selected) {
          item.selected = true;
          item.selectCount = (item.selectCount || 0) + 1;
        }
        return item;
      }),
    });
  }

  /**
   * Множественное выделение записи без сброса других выделений
   */
  selectAdditionalItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code && !item.selected) {
          item.selected = true;
          item.selectCount = (item.selectCount || 0) + 1;
        }
        return item;
      }),
    });
  }

  /**
   * Сброс выделения всех записей
   */
  clearSelection() {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => ({ ...item, selected: false })),
    });
  }

  /**
   * Снятие выделения записи по коду
   */
  deselectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

// Функция генерации уникального кода
function generateUniqueCode(list) {
    let code;
    do {
        code = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    } while (list.some(item => item.code === code));
    return code;
}

// Пример метода добавления элемента в состояние
function addItem() {
    const state = this.getState();
    const code = generateUniqueCode(state.list);
    const newItem = { 
        code, 
        title: 'Новый элемент', 
        selected: false, 
        selectCount: 0 
    };
    state.list.push(newItem);
}

export default Store;
