import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { Link } from 'react-router';

function Item({ item, onAdd = ()=>{},buttonMessage}) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => onAdd(item._id),
    
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={`/articles/${item._id}`}> <h4 className={cn('title')}>{item.title}</h4></Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title={buttonMessage} />
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
  buttonMessage: PropTypes.string,
  onAdd: PropTypes.func,
};

export default memo(Item);
