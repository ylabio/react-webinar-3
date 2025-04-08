import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { Link } from 'react-router-dom';

function Item({onAdd, item, path}) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => onAdd(item._id),
  };

  const itemLink = path ?? `/product/${item._id}`;

  return (
    <div className={cn()}>
      <h4 className={cn('title')}>
        <Link to={itemLink}>{item.title}</Link>
        </h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
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
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.object
    })
  ]),
};

export default memo(Item);
