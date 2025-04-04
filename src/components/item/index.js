import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { useNavigate } from 'react-router';
import { useTranslation } from '../../translation/TranslationContext';

function Item(props) {
  const cn = bem('Item');
  let navigate = useNavigate();
  const { t } = useTranslation();

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()} onClick={() => navigate(`/articles/${props.item._id}`)}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <h4 className={cn('title')}>{props.item.title}</h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <div onClick={e => e.stopPropagation()}>
          <Button style="primary" onClick={callbacks.onAdd} title={t('addToCart')} />
        </div>
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
