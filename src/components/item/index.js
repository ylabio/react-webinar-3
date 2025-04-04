import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { Link } from 'react-router';
import Button from '../button';
import { useAppContext } from '../../app-context';
import { STRINGS } from '../../const';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const { language } = useAppContext();

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={`/product/${props.item._id}`} className={cn('title')}>{props.item.title}</Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title={STRINGS.ADD[language]} />
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
