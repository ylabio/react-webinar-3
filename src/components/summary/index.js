import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';

function Summary(props) {
  const cn = bem('Summary');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        В корзине:{' '}
        <b>
          {props.totalCount
            ? `${props.totalCount} ${plural(props.totalCount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${numberFormat(props.totalPrice)} ₽`
            : 'пусто'}
        </b>
      </div>
      <div className={cn('actions')}>{props.children}</div>
    </div>
  );
}

Summary.propTypes = {
  totalCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(Summary);
