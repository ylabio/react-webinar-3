import { memo } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';

function Item(props) {  
  const { t } = props; 
  
  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item.item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/item/${props.item.item._id}`} >{props.item.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{t('buttonAdd')}</button>
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
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func,
};

export default memo(Item);
