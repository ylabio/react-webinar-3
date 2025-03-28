import React from 'react';
import PropTypes from 'prop-types';
import { localeNumber, plural } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({ onClick = () => {}, ...props }) {
  const cn = bem('Item');

  const callbacks = {
    onClick: e => {
      e.stopPropagation();
      onClick(props.item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <b>{props.item.title}</b>
      </div>
      <div className={cn('actions', { add: props.btnName === 'Добавить' })}>
        <div className={cn('info')}>
          {props.btnName === 'Удалить' ? (
            <p className={cn('subtitle')}>{`${props.item.count} шт`}</p>
          ) : <div></div>}
          <p className={cn('subtitle')}>{`${localeNumber(props.item.price)} ₽`}</p>
        </div>
        <button onClick={callbacks.onClick}>{props.btnName}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
};

export default React.memo(Item);
