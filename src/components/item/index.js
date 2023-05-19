import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Item(props) {
  const cn = bem('Item');

  const onClickHandler = () => {
    props.action(props.item);
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{props.item.price}&nbsp;₽</div>
      {props.item.cnt && (
        <div className={cn('cnt')}>{props.item.cnt}&nbsp;шт.</div>
      )}
      <div className={cn('actions')}>
        <button onClick={onClickHandler}>{props.actionTitle}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  action: PropTypes.func,
  actionTitle: PropTypes.string,
};

Item.defaultProps = {
  action: () => {},
};

export default React.memo(Item);
