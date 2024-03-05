import React from "react";
import PropTypes, { number, string } from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function BasketFooter({ basketCounter }) {

  const cn = bem('BasketFooter');

  return (
    <div className={cn()}>
      <div>
      Итого
      </div>
      <div>
      {`${new Intl.NumberFormat("ru").format(basketCounter.productsCost)} ₽`}
      </div>
    </div>
  );
}

BasketFooter.propTypes = {
  basketCounter: PropTypes.objectOf(number).isRequired
};

BasketFooter.defaultProps = {
  basketCounter: {
      productsQuantity: 0,
      productsQuantity: 0,
  }
}

export default React.memo(BasketFooter);