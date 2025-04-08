import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import useTranslation from '../../store/lang/use-translat';
import './style.css';

function Item({ onAdd = () => {}, item, onNavigate = () => {}, langContent }) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => onAdd(item._id),
    onNavigate: e => onNavigate(e),
  };

  return (
    <div className={cn()} onClick={callbacks.onNavigate}>
      <h4 className={cn('title')}>{item.title}</h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title={langContent.button} />
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
  langContent: PropTypes.shape({ button: PropTypes.string }),
  onAdd: PropTypes.func,
  onNavigate: PropTypes.func,
};

export default memo(Item);
