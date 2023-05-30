import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat, translate} from "../../utils";
import './style.css';


function Item(props){

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
    onLink: (e) => props.onLink(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div onClick={callbacks.onLink} className={cn("title")}>
        {props.item.title}
      </div>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.addText}</button>
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
  addText: PropTypes.string,
  onAdd: PropTypes.func,
  onLink: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {},
  onLink: () => {},
}

export default memo(Item);
