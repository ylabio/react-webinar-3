import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id),
  };
  return (
    <div className={cn()}>
      <Link to={props.pageLink} className={cn('title')}>
        {props.item.title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.addButtonText}</button>
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
  addButtonText: PropTypes.string,
  pageLink: PropTypes.string,
};

Item.defaultProps = {
  onAdd: () => { },
}

export default memo(Item);
