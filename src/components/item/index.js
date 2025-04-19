import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import Button from '../button';
import './style.css';

function Item(props) {
  const { item, onAdd = () => {}, link, labelCurr = '₽', labelAdd = 'Add' } = props;
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => onAdd(item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={link}>{item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {numberFormat(item.price)} {labelCurr}
        </div>
        <Button style="primary" onClick={callbacks.onAdd} title={labelAdd} />
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
  link: PropTypes.string,
  onAdd: PropTypes.func,
  labelCurr: PropTypes.string,
  labelAdd: PropTypes.string,
};

export default memo(Item);
