import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
    onClickLoad: e => props.onClickLoad(props.item._id),
  };
  return (
    <div className={cn()}>
      <Link to="/product" className={cn('wrap')} onClick={()=>callbacks.onClickLoad()}>
        <h4 className={cn('wrap-title')}>{props.item.title}</h4>
        <div className={cn('wrap-price')}>{numberFormat(props.item.price)} ₽</div>
      </Link>
      <div className={cn('actions')}>
        <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(Item);
