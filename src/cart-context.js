import React from "react";
import PropTypes from 'prop-types';

const CartContext = React.createContext();

/**
 * Провайдер контекста корзины. Обеспечивает доступ к состоянию корзины
 * и методам работы с ней для всех дочерних компонентов.
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {React.ReactNode} props.children - Дочерние компоненты, которые получат доступ к контексту корзины
 */
export function CartProvider({ children }) {
  const [cart, setCart] = React.useState([]);
  const [isOpened, setIsOpened]  = React.useState(false);

  /**
   * Добавляет товар в корзину или увеличивает его количество, если товар уже есть в корзине
   * @param {Object} item - Добавляемый товар
   * @param {number} item.code - Уникальный код товара
   * @param {string} item.title - Название товара
   * @param {number} item.price - Цена товара
   * @example
   * addToCart({ code: 1, title: 'Футболка', price: 1000 });
   */
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (elem) => elem.code === item.code
      );
      if (existingItemIndex >= 0) {
        return prevCart.map((elem, index) => 
          index === existingItemIndex
            ? { ...elem, quantity: elem.quantity + 1 }
            : elem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  /**
   * Удаляет товар из корзины по его коду
   * @param {number} code - Уникальный код товара для удаления
   * @example
   * removeFromCart(1); // Удаляет товар с кодом 1
   */
  const removeFromCart = (code) => {
    setCart((prevCart) => prevCart.filter((item) => item.code !== code));
  }

  /**
   * Переключает видимость модального окна корзины
   * (открывает/закрывает модальное окно)
   * @example
   * toggleCartModal(); // Инвертирует текущее состояние
   */
  const toggleCartModal = () => {
    setIsOpened(!isOpened);
  }

  const value = {
    cart,
    isOpened,
    addToCart,
    removeFromCart,
    toggleCartModal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Кастомный хук для доступа к контексту корзины.
 * Предоставляет состояние корзины и методы для работы с ней.
 * @hook
 * @returns {Object} Объект с данными и методами корзины
 * @property {Array} cart - Массив товаров в корзине
 * @property {boolean} isOpened - Флаг видимости модального окна корзины
 * @property {function} addToCart - Функция добавления товара в корзину
 * @property {function} removeFromCart - Функция удаления товара из корзины
 * @property {function} toggleCartModal - Функция переключения видимости модального окна
 */
export function useCart() {
  return React.useContext(CartContext);
}

CartProvider.propTypes = {
  children: PropTypes.node,
};