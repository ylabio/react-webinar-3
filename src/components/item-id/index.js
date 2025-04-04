import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function ItemId(props) {
  const cn = bem('ItemId');

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('discription')}>{props.item.description}</div>
      <div className={cn('country')}>{props.item.madeTitle}</div>
      <div className={cn('category')}>{props.item.categoryTitle}</div>
      <div className={cn('year')}>{props.item.edition}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
      </div>
    </div>
  );
}

ItemId.propTypes = {
  item: PropTypes.shape({
    // _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    discription: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};



export default memo(ItemId);
