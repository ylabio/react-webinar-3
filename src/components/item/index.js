import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import {numberFormat} from "../../utils";
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={props.linkUrl}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.textData.button}</button>
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
  textData: PropTypes.exact({
    button: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func,
  linkUrl: PropTypes.string.isRequired,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
