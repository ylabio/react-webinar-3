import {memo} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket({ item, onRemove, onProduct, valueLang }) {
 
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => onRemove(item._id),
    onProduct: () => onProduct(item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}  ><p onClick={callbacks.onProduct}>{item.title}</p></div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{ valueLang ? 'Удалить' : 'Remove' }</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
  onProduct: propTypes.func,
  valueLang: propTypes.bool
};

ItemBasket.defaultProps= {
  onRemove: () => {},
  onProduct: () => {},
  valueLang: true,
};

export default memo(ItemBasket);
