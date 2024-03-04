import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {addSpaceInPrice} from "../../utils";
import './style.css';

function FooterBasket({summaryPrice}) {
  const cn = bem('FooterBasket');

  return (
    <div className={cn()}>
      <div className={cn('title')}>Итого</div>
      <div className={cn('result')}>{addSpaceInPrice(summaryPrice)} ₽</div>
    </div>
  )
}

FooterBasket.propTypes = {
  summaryPrice: PropTypes.number,
};

export default React.memo(FooterBasket);
