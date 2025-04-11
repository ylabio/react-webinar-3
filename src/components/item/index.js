import { memo, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

function Item(props) {
  const cn = bem('Item');
  const navigate = useNavigate();

  const callbacks = {
    onAdd: e => {
      e.preventDefault();
      e.stopPropagation();
      props.onAdd(props.item._id);
    },
    onNavigationToProduct: e => {
      e.preventDefault();
      props.onCloseModal();
      navigate(ROUTES.PRODUCT(props.item._id));
    },
  };

  return (
    <Link onClick={callbacks.onNavigationToProduct}>
      <div className={cn()}>
        {/*<div className={cn('code')}>{props.item._id}</div>*/}
        <h4 className={cn('title')}>{props.item.title}</h4>
        <div className={cn('actions')}>
          <div className={cn('price')}>{numberFormat(props.item.price, props.language)}</div>
          <Button style="primary" onClick={callbacks.onAdd} title={props.title} />
        </div>
      </div>
    </Link>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  onCloseModal: PropTypes.func,
  language: PropTypes.string,
  title: PropTypes.string,
};

Item.defaultProps = {
  onAdd: () => {},
  onCloseModal: () => {},
};

export default memo(Item);
