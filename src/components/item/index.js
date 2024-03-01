import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const onAdd = () => {
    
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <button onClick={onAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Item);
