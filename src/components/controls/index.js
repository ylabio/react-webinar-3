import React from "react";
import PropTypes from 'prop-types';
import Vidget from "../vidget";
import Button from "../button";
import './style.css';

/* COMPONENTS TODO:
component controls:
 - component vidget
 - component button */

function Controls({cart, callback}) {
  return (
    <div className='Controls'>
      <Vidget cart={cart} />
      <Button style="Button_controls" callback={callback}>
        Перейти
      </Button>
    </div>
  )
}

// Typechecking with PropTypes:
Controls.propTypes = {
  cart: PropTypes.shape({
    goods: PropTypes.number,
    costs: PropTypes.number
  }).isRequired,
  callback: PropTypes.func.isRequired
};

// Default values for properties:
Controls.defaultProps = {
  callback: () => {},
}

export default React.memo(Controls);
