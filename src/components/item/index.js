import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { useNavigate } from 'react-router-dom';
import text from '../../text';
import useSelector from '../../store/use-selector';

function Item(props) {
  const cn = bem('Item');
  const navigate = useNavigate();

  const select = useSelector(state => ({
    lang: state.language.language || 'ru',
  }))

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
  };

  const clickHandler = (event) => {
    if (event.target.tagName === 'BUTTON') {
      return;
    }
    navigate(`/product/${props.item._id}`);
  }


  return (
    <div onClick={clickHandler} className={cn()} >
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <h4 className={cn('title')} onClick={() => { navigate(`/product/${props.item._id}`) }}>{props.item.title}</h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title={text[select.lang].addButton} />
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

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
