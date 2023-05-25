import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import { memo } from "react";
import useLanguage from '../../../localization/use-language';
import { numberFormat } from "../../../utils";
import './style.css';

function Item(props){

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
    onTitleClick: (e) => props.onTitleClick(props.item._id)
  }

  const ln = useLanguage();

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={callbacks.onTitleClick}>
        {props.item.title}
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
  onAdd: PropTypes.func,
  onTitleClick: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {},
  onTitleClick: () => {}
}

export default memo(Item);
