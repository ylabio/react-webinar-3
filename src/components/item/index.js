import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { Link } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';

function Item({ item, onAdd, linkTo = `/articles/${item._id}` }) {
  const cn = bem('Item');
  const { t } = useTranslate();

  const callbacks = {
    onAdd: () => onAdd(item._id),
  };

  return (
    <div className={cn()}>
      <h4 className={cn('title')}>
        <Link to={linkTo}>{item.title}</Link>
      </h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title={t('add')} />
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
  onAdd: PropTypes.func.isRequired,
};

// Item.defaultProps = {
//   onAdd: () => {},
// };

export default memo(Item);
