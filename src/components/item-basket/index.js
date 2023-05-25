import { cn as bem } from "@bem-react/classname";
import { PropTypes } from 'prop-types';
import { memo } from 'react';
import useLanguage from '../../localization/use-language';
import { numberFormat } from "../../utils";
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onTitleClick: (e) => props.onTitleClick(props.item._id)
  };

  const ln = useLanguage();

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={callbacks.onTitleClick}>{props.item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {ln('things')}</div>
        <div className={cn('cell')}><button className={cn('remove')} onClick={callbacks.onRemove}>{ln('buttonRemove')}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: PropTypes.func, // propTypes или PropTypes ?
  onTitleClick: PropTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onTitleClick: () => {}
}

export default memo(ItemBasket);
