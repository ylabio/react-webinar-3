import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { currency } from "../../utils";

function CartLayout({children, onCloseCart, sum}) {

  const cn = bem('CartLayout')

  return (
    <div className={cn()} onClick={onCloseCart}>
      <div className={cn('container')} onClick={(e) => e.stopPropagation()}>
        {children}
        <div className={cn('bottom')}>
          <span className={cn('total')}>Итого</span>
          <span className={cn('amount')}>{currency(sum)}</span>
        </div>
      </div>
    </div>
  );
}

CartLayout.propTypes = {
  children: PropTypes.node,
  onCloseCart: PropTypes.func,
  sum: PropTypes.number
}

export default React.memo(CartLayout);