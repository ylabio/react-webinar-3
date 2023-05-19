import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Counter from '../counter/index.js';

function Item (props) {

  const [count, setCount] = useState(0);

  const callbacks = {
    onClick : () => {
      props.onSelect(props.item.code);
      if(!props.item.selected) {
        setCount(count + 1);
      }
    },
    onDelete : (evt) => {
      evt.stopPropagation();
      props.onDelete(props.item.code);
    }
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}
         onClick={callbacks.onClick}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        <span>{props.item.title}</span>
        {count ? <Counter number={count} /> : ''}
      </div>
      <div className='Item-actions'>
        <button className='Item-button' onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
}

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
}

export default React.memo(Item);
