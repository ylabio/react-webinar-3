import React from 'react';
import PropTypes from 'prop-types';
import {separatingNumberSpaces} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onClick(props.item.code);
    }
  }

  return (
    <div className={cn()} >
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>
        {separatingNumberSpaces(props.item.price)} &#8381;
      </div>
      {props.item.countProduct && <div className={cn('countProduct')}>
        {separatingNumberSpaces(props.item.countProduct)} шт
        </div>}
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>
          {props.textButton}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    countProduct: PropTypes.number
  }).isRequired,
  textButton: PropTypes.node,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  onClick: () => {
  }
}

export default React.memo(Item);
