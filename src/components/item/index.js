import {memo} from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function Item(props) {

  const {item, itemText} = {...props}

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(item._id)
  }

  return (
    <div className={cn()}>
      <Link to={`/${item._id}`} className={cn('title')}>
        {item.title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} {itemText.currency}</div>
        <button onClick={callbacks.onAdd}>{itemText.itemAddButtonText}</button>
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
  itemText: PropTypes.shape({
    currency: PropTypes.string,
    itemAddButtonText: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
