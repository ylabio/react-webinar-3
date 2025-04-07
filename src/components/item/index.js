import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { Link } from 'react-router';
import locales from '../../locales';
import useSelector from '../../store/use-selector';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
  };

  const select = useSelector(state => ({
    language: state.lang.language,
  }));

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={`/item/${props.item._id}`}>
        <h4 className={cn('title')}>{props.item.title}</h4>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title={locales[select.language].add} />
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
