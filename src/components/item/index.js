import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import {numberFormat} from "../../utils";
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        { props.url
            ? <Link to={props.url}>{props.item.title}</Link>
            : props.item.title
        }
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
  url: PropTypes.string,
  btnAddTitle: PropTypes.string,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  url: '',
  btnAddTitle: 'add',
  onAdd: () => {},
}

export default memo(Item);
