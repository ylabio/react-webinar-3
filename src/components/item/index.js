import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import useSelector from "../../store/use-selector";

function Item({ item, onAdd, onProduct }) {
  
  const select = useSelector((state) => ({
    valueLang: state.language.valueLang,
  }));

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => onAdd(item._id),
    onProduct: () => onProduct(item._id),
  }

  return (
    <div className={cn()}>
      <div className={cn('title')} >
        <p onClick={callbacks.onProduct}>{item.title}</p>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{ select.valueLang ? 'Добавить' : 'Add' }</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
  onProduct: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
  onProduct: () => {},
};

export default memo(Item);
