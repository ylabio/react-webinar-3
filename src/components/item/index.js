import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { Link } from 'react-router';
import Button from '../button';
import useSelector from '../../store/use-selector';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const { onAdd = () => {} } = props;

  const callbacks = {
    onAdd: e => onAdd(props.item._id),
  };

  const select = useSelector(state => ({
    language: state.language.lang,
  }));

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <h4 className={cn('title')}>
        <Link to={`/product/${props.item._id}`}>{props.item.title}</Link>
      </h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <Button 
          style="primary" 
          onClick={callbacks.onAdd} 
          title={select.language === "ru" ? "Добавить" : "Add"} />
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
