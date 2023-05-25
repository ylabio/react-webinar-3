import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import { memo } from "react";
import { Link } from "react-router-dom";
import useLanguage from '../../../localization/use-language';
import { numberFormat } from "../../../utils";
import './style.css';

function Item(props) {

  const cn = bem('Item');
  const ln = useLanguage();

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        {props.url ? <Link to={props.url}>{props.item.title}</Link> : props.item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button className={cn('add')} onClick={callbacks.onAdd}>{ln('buttonAdd')}</button>
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
  onAdd: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => { }
}

export default memo(Item);
