import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import { Link, useLocation } from "react-router-dom";
import './style.css';

function Item(props) {     

  const id = props.item._id

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={`${props.pathProduct}/${id}`}>{props.item.title}</Link>        
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.getTranslation('ADD', props.language)}</button>
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
  pathProduct: PropTypes.string,
  onAdd: PropTypes.func,
  language: PropTypes.string,
  getTranslation: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {},
  getTranslation: () => {},
}

export default memo(Item);
