import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Controls({ sum, count, onModalStateChange }) {
  const getMessage = () => {
    if (!count) {
      return 'Пусто';
    }
    const message = `${count} ${plural(count, {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    })} / ${sum.toLocaleString()} ₽`;
    return message;
  }

  return (
    <div className="Controls">
      <button onClick={() => onModalStateChange()}>{getMessage()}</button>
    </div>
  );
}

Controls.propTypes = {
  onModalStateChange: PropTypes.func,
  sum: PropTypes.number,
  count: PropTypes.number,
};

Controls.defaultProps = {
  onModalStateChange: () => {},
};

export default React.memo(Controls);
