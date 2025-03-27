import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';

function Controls({ count, sum, onAdd }) {
  return (
    <div className="Controls">
      <button>
        {count} {plural(count, ['товар', 'товара', 'товаров'])} / {sum.toLocaleString('ru-RU')} ₽
      </button>
    </div>
  );
}

Controls.propTypes = {
  count: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
};

export default React.memo(Controls);
