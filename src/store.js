
/**
 * Хранилище состояния приложения
 */
class Store {
  constructor( initState = {} ) {
    this.state = {...initState, basket:[]};
    this.listeners = [];
    this.nextCode = Math.max( ...initState.list.map( item => item.code ), 0 ) + 1;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe( listener ) {
    this.listeners.push( listener );
    return () => {
      this.listeners = this.listeners.filter( item => item !== listener );
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
  setState( newState ) {
    this.state = newState;
    for ( const listener of this.listeners ) listener();
  }

  /**
   * Добавление новой записи
   */

  addItem(code) {
    const product = this.state.list.find(item => item.code === code);
    if (product) {
      this.setState( {
        ...this.state,
        basket: [...this.state.basket, product],
      } );
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  onDeleteItem( code ) {
    const currentIndex = this.state.basket.findIndex( item => item.code === code );
    if ( currentIndex !== -1 ){
      this.setState( {
        ...this.state,
        basket: this.state.basket.filter( (item, index) => currentIndex !== index ),
      } );
    }
  }


  calculateTotal(sumReducer = sumReducer) {
    return this.state.basket.reduce((sum, item) => {
      return sumReducer(sum, item.price);
    }, 0);
  }
}

export default Store;

