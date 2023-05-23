import React, {useState} from "react";
import PropTypes from "prop-types";
import Controls from "../controls";
import { numberFormat } from "../../utils";
import './style.css';

function Item(props){

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>{`${numberFormat(props.item.price)} \u20bd`}</div>
      <Controls 
        innerText='Добавить' 
        onClick={() => props.onAddItem(props.item.code)}
      />
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onAddItem: PropTypes.func
};

Item.defaultProps = {
  onAddItem: () => {},
}

export default React.memo(Item);
