import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import cart from 'src/cart.svg' 

function Controls({ handleOpen = () => {}, text="title" }) {
  return (
    <div className="Controls">
      <button onClick={() => handleOpen()}>
        <img src={cart}/>
        {text}
        </button>
    </div>
  );
}

Controls.propTypes = {
  handleOpen: PropTypes.func,
  text: PropTypes.string,
};



export default React.memo(Controls);
