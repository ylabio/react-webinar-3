import { StateManager } from "./state-manager";
import { ListManager } from "./list-manager";
import { CartManager } from "./cart-manager";

class Store {
  constructor(initState = {}) {
    this.stateManager = new StateManager(initState);
    this.listManager = new ListManager(this.stateManager);
    this.cartManager = new CartManager(this.stateManager);
  }

  subscribe(listener) {
    return this.stateManager.subscribe(listener);
  }

  // Получение списка товаров
  getStateList() {
    return this.listManager.getStateList();
  }

  // Получение состояния корзины
  getCartState() {
    return this.cartManager.getCartState();
  }

  // Добавление товара в корзину
  addCartProductCard(code) {
    this.cartManager.addCartProductCard(code);
  }

  // Удаление товара из корзины
  clearCartProductCard(code) {
    this.cartManager.clearCartProductCard(code);
  }

  getState() {
    return this.stateManager.getState();
  }

  setState(newState) {
    this.stateManager.setState(newState);
  }
}


export {Store}
