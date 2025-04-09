import { memo } from 'react';
import { Link } from 'react-router';

import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Button from '../button';

import { LANGUAGES } from '../../lang/languages';
import { numberFormat } from '../../utils';

import './style.css';

function Item({ onAdd = () => {}, lang = 'ru', ...props }) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <Link
        to={props.itemPageLink}
        state={{ itemId: props.item._id }}
        className={cn('link')}
      >
        <h4 className={cn('title')}>{props.item.title}</h4>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title={LANGUAGES[lang].add} />
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
  itemPageLink: PropTypes.string,
  lang: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
};

export default memo(Item);
