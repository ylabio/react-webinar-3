import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import {Link} from "react-router";


function Item({ item, onAdd = () => {}, link , labels, linkState}) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => {
      e.stopPropagation();
      onAdd(item._id);
    },
  };

  return (
    <div className={cn()}>
      <Link to={link} state={linkState} className={cn('title')}>{item.title}</Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <Button style="primary" onClick={(e) => callbacks.onAdd(e)} title={labels.buttonAdd} />
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
  labels: PropTypes.shape({
    buttonAdd: PropTypes.string.isRequired,
  })
};

export default memo(Item);
