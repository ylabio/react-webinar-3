import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { useNavigate } from 'react-router-dom';

function Item({item, onAdd, text, navigateTo=`/product/${item._id}`}) {
  const cn = bem('Item');
  const navigate = useNavigate();

  const callbacks = {
    onAdd: e => onAdd(item._id),
  };

  const clickHandler = (event) => {
    if (event.target.tagName === 'BUTTON') {
      return;
    }
    navigate(navigateTo);
  }

  return (
    <div onClick={clickHandler} className={cn()} >
      <h4 className={cn('title')} onClick={() => { navigate(navigateTo) }}>{item.title}</h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title={text.addButton} />
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
