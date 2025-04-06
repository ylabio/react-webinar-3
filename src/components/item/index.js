import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { numberFormat } from '../../utils';
import Button from '../button';
import { translations } from '../../utils';
import './style.css';

function Item({ item, onAdd = () => {}, language }) {
  const cn = bem('Item');
  const listTransfers = translations[language];

  const callbacks = {
    onAdd: (e) => {
      onAdd(item._id);
    },
  };

  return (
    <div className={cn()}>
      <Link to={`/item/${item._id}`} className={cn('title-link')}>
        <h4 className={cn('title')}>{item.title}</h4>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title={listTransfers.add} />
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
  language: PropTypes.string.isRequired,
};

export default memo(Item);
