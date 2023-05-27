import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";

function Item(props){
  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
    localize: (text) => props.localize(text)
  }

  return (
    <div className={cn()}>
      <Link to={props.url} className={cn('title')}>
        {props.item.title}
      </Link>

      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{callbacks.localize('add')}</button>
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
  localize: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {},
  localize: () => {}
}

export default memo(Item);
