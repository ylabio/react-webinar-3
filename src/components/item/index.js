import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const { 
    item, 
    onAdd, 
    addToBasketText,
    linkTemplate = `/item/${item._id}`
  } = props;

  const callbacks = {
    onAdd: e => onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <h4 className={cn('title')} >
        <Link to={linkTemplate}>{props.item.title}</Link>
      </h4>
      <div className={cn('actions')}>
      <div className={cn('price')}>
        {numberFormat(
          props.item.price, 
          undefined,
          { maximumFractionDigits: 0 }
        )} ₽
      </div>
        <Button style="primary" onClick={callbacks.onAdd} title={addToBasketText} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
  addToBasketText: PropTypes.string.isRequired,
  linkTemplate: PropTypes.string
};


export default memo(Item);