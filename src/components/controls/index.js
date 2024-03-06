import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {formatNumber, plural} from "../../utils";

function Controls({onShowModal, sum, quantity}) {
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <div className={cn('content')}>
        В корзине:
        { quantity <= 0
          ? <span>пусто</span>
          : <span>{quantity} {plural(quantity, {one: 'товар', few: 'товара', many: 'товаров'})} / {formatNumber(sum)}  ₽</span>
        }
      </div>
      <button onClick={() => onShowModal()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onShowModal: PropTypes.func,
  sum: PropTypes.number,
  quantity: PropTypes.number,
  showModal: PropTypes.bool,
};

Controls.defaultProps = {
  onShowModal: () => {}
}

export default React.memo(Controls);
