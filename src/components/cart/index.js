import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { currency } from '../../utils';

function Cart({sum}) {
    const cn = bem('Cart');

    return (
        <div className={cn('bottom')}>
            <span className={cn('total')}>Итого</span>
            <span className={cn('amount')}>{currency(sum)}</span>
        </div>
    )
}

Cart.propTypes = {
    sum: PropTypes.number
  }

export default React.memo(Cart)