import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function ItemCard(props) {
  return (
    <div className={'Item'}>
      <div className='Item-code'>
        {props.item.code}
      </div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <button onClick={() => props.funcButton(props.item.code)}>
          {props.buttonTitle}
        </button>
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    price: PropTypes.number,
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }),
  funcButton: PropTypes.func
};

ItemCard.defaultProps = {
  funcButton: () => {
  }
}

export default React.memo(ItemCard);
