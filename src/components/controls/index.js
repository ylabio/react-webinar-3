import React from "react";
import PropTypes from "prop-types";
import { plural, numberFormat } from '../../utils';
import "./style.css";

function Controls(props) {
  const getPluralWord = plural(props.basket.productsCount, {
    one: 'товар',
    few: 'товара',
    many: 'товаров',
  });

  return (
    <div className='Controls'>
      <div className='Controls-interface'>
        В корзине:
        <strong
          className='Controls-interface-count'>
          {props.basket.productsCount === 0 ?
            "пусто"
            :
            `${props.basket.productsCount} ${getPluralWord} / ${numberFormat(props.basket.allPrice)} ₽`
          }
        </strong>
      </div>
      <button onClick={props.onOpenModal}>
        Перейти
      </button>
    </div>
  )
}

Controls.propTypes = {
  basket: PropTypes.shape({
    products: PropTypes.array,
    allPrice: PropTypes.number,
    productsCount: PropTypes.number,
  }),
  onOpenModal: PropTypes.func
};

Controls.defaultProps = {
  onOpenModal: () => { }
}

export default React.memo(Controls);
