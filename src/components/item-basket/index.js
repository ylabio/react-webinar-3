import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';
import {ProductLoader} from "../../app/product";

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onProduct: (e) => {
      props.refreshDataProduct(props.item._id);
      props.onClose();
    },
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link className={cn('link')} onClick={callbacks.onProduct} to={`${props.path}${props.item._id}`}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.ItemQ}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.buttonDeleteProduct}</button>
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
  onClose: propTypes.func,
  buttonDeleteProduct: PropTypes.string,
  ItemQ: PropTypes.string,
  refreshDataProduct: propTypes.func,
  path: PropTypes.string,
}

ItemBasket.defaultProps = {
  path: '/product/',
  onRemove: () => {},
  onClose: () => {},
  refreshDataProduct: () => {},
}

export default memo(ItemBasket);
