import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Item from "../item";

function Modal(props){
  return (
    <div className={props.active? 'Modal active': 'Modal'} onClick={()=>props.setActive(false)}>
      <div className='Modal-basket' onClick={e => e.stopPropagation()}>
        <button
            onClick={()=> props.setActive(false)}
        >
            close
        </button>
          {props.basket.length ?
              <div >{
                  props.basket.map(item =>
                      <div key={item.code} >
                          <Item item={item} onDeleteItem={props.onDeleteItem} active={props.active}/>
                      </div>
                  )}
              </div>
        : <div>пусто</div>
          }
      </div>
    </div>
  )
}

Modal.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  })).isRequired,
    calculatePrice: PropTypes.number,
    setActive: PropTypes.func,
    active: PropTypes.bool,
    onDeleteItem: PropTypes.func,
};

Modal.defaultProps = {
    setActive: () => {},
    onDeleteItem: () => {},
}

export default React.memo(Modal);
