import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {formatNumber, plural} from "../../utils";

function Controls({onShow, sum, quantity, hideCart}) {
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      {
        hideCart ?
            <>
              <div className={cn('content')}>
                В корзине:
                { quantity <= 0
                  ? <span>пусто</span>
                  : <span>{quantity} {plural(quantity, {one: 'товар', few: 'товара', many: 'товаров'})} / {formatNumber(sum)}  ₽</span>
                }
              </div>

              <button onClick={() => onShow()}>Перейти</button>
            </>
          : <></>
      }
    </div>
  )
}

Controls.propTypes = {
  onShow: PropTypes.func,
  sum: PropTypes.number,
  quantity: PropTypes.number,
  hideCart: PropTypes.bool,
};

Controls.defaultProps = {
  onShow: () => {}
}

export default React.memo(Controls);
