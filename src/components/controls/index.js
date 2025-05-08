import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ uniqueCount, totalPrice, onOpenCart }) {
  const label = uniqueCount
    ? `${uniqueCount} ${pluralForm(uniqueCount)} / ${totalPrice.toLocaleString()} ₽`
    : 'Пусто';

  return (
    <div className="Controls">
      <button className="CartButton" onClick={onOpenCart}>
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
  // cart: PropTypes.array.isRequired,
  // totalCount: PropTypes.number.isRequired,
  uniqueCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onOpenCart: PropTypes.func.isRequired,
};
// Controls.propTypes = {
//   onAdd: PropTypes.func,
// };
//
// Controls.defaultProps = {
//   onAdd: () => {},
// };

export default React.memo(Controls);
