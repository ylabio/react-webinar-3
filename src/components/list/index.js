import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Item from '../item';

function List(props) {

  const cn = bem('List');

  const callbacks = {
    onClick: props.onClick
  }

  return (
    <div className={cn()}>{
      props.list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item 
            item={item} 
            textButton={props.textButton} 
            onClick={callbacks.onClick} 
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  textButton: PropTypes.node,
  onClick: PropTypes.func,
};

List.defaultProps = {
  onClick: () => {
  }
}

export default React.memo(List);
