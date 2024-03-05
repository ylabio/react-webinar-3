import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CartTotal({totalSum}) {

  const cn = bem('CartTotal');

  return (
      <div className={cn()}>
        <span className={cn('label')}>Итого</span>
        <span>{totalSum}</span>
      </div>
  )
}

CartTotal.propTypes = {
  totalSum: PropTypes.string.isRequired
};

export default React.memo(CartTotal);
