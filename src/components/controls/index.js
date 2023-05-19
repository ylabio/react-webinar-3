import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { getTotalPrice, plural } from '../../utils';

function Controls({ order, setIsOpenModal }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('order')}>
        В корзине:
        <span className={cn('total')}>
          {order.length} {plural(order.length, { one: 'товар', few: 'товара', many: 'товаров', })} / {getTotalPrice(order)} ₽
        </span>
      </div>
      <button
        onClick={() => {
          setIsOpenModal(true);
        }}
      >
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  order: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  setIsOpenModal: PropTypes.func,
};

Controls.defaultProps = {
  setIsOpenModal: () => { },
};

export default React.memo(Controls);
