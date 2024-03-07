import React from "react";
import PropTypes from 'prop-types';
import {formatPrice, plural} from "../../utils";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Controls({totalItems, totalPrice, setOpenModal}) {
  const variants = {one: 'товар', few: 'товара', many: 'товаров'};
  const cn = bem('Controls');

  const handleOpenModal = () => {
    setOpenModal(true);
    document.body.style.overflow = "hidden";
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>В корзине:</div>
      <div className={cn('param')}>
        {totalItems > 0 
          ? `${plural(totalItems, variants)} / ${formatPrice(totalPrice)}`
          : 'пусто'
        }
      </div>
      <button onClick={handleOpenModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  totalItems: PropTypes.number,
  totalPrice: PropTypes.number,
  setOpenCart: PropTypes.func
};

Controls.defaultProps = {
  setOpenCart: () => {}
}

export default React.memo(Controls);
