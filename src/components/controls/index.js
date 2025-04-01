import React from 'react';
import PropTypes from 'prop-types';
import { pluralizeItems } from '../../utils';
import './style.css';

function Controls({ icon: Icon = null, totalItems = 0, totalPrice = 0, onToggleCart = () => {} }) {
  return (
    <div className="Controls">
      <button onClick={onToggleCart} className="Controls-button" aria-label="Корзина">
        {Icon && <Icon className="Icon" />}
        {totalItems > 0
          ? `${totalItems} ${pluralizeItems(totalItems)} / ${new Intl.NumberFormat('ru-RU').format(totalPrice)} ₽`
          : 'Пусто'}
      </button>
    </div>
  );
}

Controls.propTypes = {
  icon: PropTypes.elementType, // Принимаем компонент иконки
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onToggleCart: PropTypes.func.isRequired,
};

export default React.memo(Controls);
