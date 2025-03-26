import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ cart }) {
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.count, 0);
  const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.price * item.count, 0);

  const label = totalItems
    ? `${totalItems} ${pluralForm(totalItems)} / ${totalPrice.toLocaleString()} ₽`
    : 'Пусто';

  return (
    <div className="Controls">
      <button className="CartButton">
        <img src={new URL('src/assets/images/basket.png', import.meta.url).href} alt="Корзина" />
        <span>{label}</span>
      </button>
      {/*<button onClick={() => onAdd()}>Добавить</button>*/}
    </div>
  );
}

/**
 * Формирует правильное склонение слова "товар"
 * @param n {number}
 * @returns {string}
 */
function pluralForm(n) {
  if (n % 10 === 1 && n % 100 !== 11) return 'товар';
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return 'товара';
  return 'товаров';
}

Controls.propTypes = {
  cart: PropTypes.object.isRequired,
};
// Controls.propTypes = {
//   onAdd: PropTypes.func,
// };
//
// Controls.defaultProps = {
//   onAdd: () => {},
// };

export default React.memo(Controls);
