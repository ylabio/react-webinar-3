import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: () => props.onAdd(props.item)
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/product/${props.item._id}`}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.langData.buttons.onAddTxt}</button>
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
  langData: PropTypes.object,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item);
