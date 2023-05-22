import React from "react";
import PropTypes from "prop-types";
import {convertPrice} from "../../utils";
import './style.css';
import PrimaryButton from "../primary-button";

function Item({ item, onClick, }){
  return (
    <div className={'Item'}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
      <div className={'Item-info'}>
        {convertPrice(item.price)}
      </div>
      <div className='Item-actions'>
        <PrimaryButton description={'Добавить'} onClick={() => onClick(item.code)}/>
      </div>
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
  onClick: PropTypes.func
};

Item.defaultProps = {
  onClick: () => {},
}

export default React.memo(Item);
