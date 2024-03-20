/**
 * Базовый класс для модулей хранилища (внешнего состояния)
 * Для группировки действий над внешним состоянием
 */
class StoreModule {

  constructor(store, name) {
    this.store = store;
    this.name = name;
  }

  initState() {
    return {}
  }

  getState() {
    console.log('getState', this.store.getState())
    return this.store.getState()[this.name];
  }

  setState(newState, description = 'setState') {
    console.log('setState', this.store.getState(), this.name, newState)
    this.store.setState({
      ...this.store.getState(),
      [this.name]: newState
    }, description)
  }

}

export default StoreModule;
