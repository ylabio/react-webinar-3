import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import useSelector from '../../store/use-selector';
import { messages } from '../../messages';
import './style.css';
import { Link } from 'react-router';

function Item(props, onAdd = ()=>{},) {
   const select = useSelector(state => ({
      lang: state.inter.lang,
    }));
  const buttonMessage = messages[select.lang].addButton;
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
    
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={`/articles/${props.item._id}`}> <h4 className={cn('title')}>{props.item.title}</h4></Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
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
  onAdd: PropTypes.func,
};

export default memo(Item);
