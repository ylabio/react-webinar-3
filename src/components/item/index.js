import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import {numberFormat} from "../../utils";
import './style.css';

function Item(props) {
  console.log('Item ' + props.item._id);
  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`article/${props.item._id}`}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.btnAddTitle}</button>
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
  btnAddTitle: PropTypes.string,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  btnAddTitle: 'add',
  onAdd: () => {},
}

export default memo(Item);
